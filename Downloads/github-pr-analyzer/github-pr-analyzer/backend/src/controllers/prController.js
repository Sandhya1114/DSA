const Analysis = require('../models/Analysis');
const { parsePrUrl, getPullRequest, getPullRequestFiles } = require('../services/githubService');
const { analyzePullRequest } = require('../services/groqService');

async function analyzePR(request, reply) {
  const { prUrl } = request.body;

  if (!prUrl) {
    return reply.code(400).send({ error: 'prUrl is required' });
  }

  try {
    const { owner, repo, prNumber } = parsePrUrl(prUrl);

    const [prData, files] = await Promise.all([
      getPullRequest(owner, repo, prNumber),
      getPullRequestFiles(owner, repo, prNumber),
    ]);

    const aiResult = await analyzePullRequest({
      title: prData.title,
      description: prData.body,
      files,
    });

    const analysis = await Analysis.create({
      prUrl,
      owner,
      repo,
      prNumber,
      title: prData.title,
      author: prData.user?.login,
      filesChanged: files.length,
      additions: prData.additions,
      deletions: prData.deletions,
      summary: aiResult.summary,
      riskLevel: aiResult.riskLevel,
      suggestions: aiResult.suggestions,
    });

    return reply.send(analysis);
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: err.message || 'Failed to analyze PR' });
  }
}

async function getHistory(request, reply) {
  const analyses = await Analysis.find().sort({ createdAt: -1 }).limit(50);
  return reply.send(analyses);
}

async function getOne(request, reply) {
  const { id } = request.params;
  const analysis = await Analysis.findById(id);
  if (!analysis) return reply.code(404).send({ error: 'Not found' });
  return reply.send(analysis);
}

module.exports = { analyzePR, getHistory, getOne };
