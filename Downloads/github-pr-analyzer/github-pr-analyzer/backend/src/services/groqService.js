const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

/**
 * Sends PR metadata + file diffs to Groq and asks for a structured analysis.
 * Returns { summary, riskLevel, suggestions[] }
 */
async function analyzePullRequest({ title, description, files }) {
  // Build a compact diff excerpt (avoid sending huge payloads / exceeding token limits)
  const diffExcerpt = files
    .slice(0, 20) // cap number of files sent
    .map((f) => `File: ${f.filename} (+${f.additions}/-${f.deletions})\n${(f.patch || '').slice(0, 1500)}`)
    .join('\n\n---\n\n');

  const prompt = `You are a senior software engineer reviewing a GitHub Pull Request.

PR Title: ${title}
PR Description: ${description || 'N/A'}

Changed files and diffs (truncated):
${diffExcerpt}

Respond ONLY with valid JSON in this exact shape, no markdown fences, no extra text:
{
  "summary": "2-4 sentence summary of what this PR does",
  "riskLevel": "low" | "medium" | "high",
  "suggestions": ["short actionable review suggestion", "..."]
}`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 1024,
  });

  const raw = completion.choices[0]?.message?.content?.trim() || '{}';
  const cleaned = raw.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Fallback if the model didn't return clean JSON
    return {
      summary: cleaned.slice(0, 500),
      riskLevel: 'medium',
      suggestions: [],
    };
  }
}

module.exports = { analyzePullRequest };
