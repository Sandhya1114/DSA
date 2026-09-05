const axios = require('axios');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

/**
 * Parses a GitHub PR URL like:
 * https://github.com/{owner}/{repo}/pull/{number}
 */
function parsePrUrl(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/i);
  if (!match) {
    throw new Error('Invalid GitHub PR URL. Expected format: https://github.com/owner/repo/pull/123');
  }
  const [, owner, repo, prNumber] = match;
  return { owner, repo, prNumber: Number(prNumber) };
}

async function getPullRequest(owner, repo, prNumber) {
  const { data } = await githubApi.get(`/repos/${owner}/${repo}/pulls/${prNumber}`);
  return data;
}

async function getPullRequestFiles(owner, repo, prNumber) {
  const { data } = await githubApi.get(
    `/repos/${owner}/${repo}/pulls/${prNumber}/files`,
    { params: { per_page: 100 } }
  );
  return data;
}

module.exports = { parsePrUrl, getPullRequest, getPullRequestFiles };
