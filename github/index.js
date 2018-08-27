/* eslint-disable camelcase */

const url = require('url');
const {send} = require('micro');
const fetch = require('node-fetch');
const pickBy = require('lodash.pickby');

module.exports = async (req, res) => {
  const {pathname} = url.parse(req.url);
  const [, type, username] = pathname.split('/');

  if (!type || !username) {
    send(res, 400, {
      error: 'Please use a URL with the format /(users|orgs)/:username'
    });
    return;
  }

  const repos = await fetch(`https://api.github.com/${type}/${username}/repos`);

  if (!repos.ok) {
    throw new Error('There was an issue reaching the GitHub API.');
  }

  const repoList = (await repos.json()).slice(0, 50);

  return {
    results_size: repoList.length,
    results: repoList.map(repo => ({
      id: String(repo.id),
      title: repo.full_name,
      description: repo.description,
      image_url: repo.owner.avatar_url,
      last_update: (new Date(repo.updated_at)).getTime(),
      blob: pickBy(repo, (value, key) => !key.match(/^(owner|.*_url)$/))
    })).sort((a, b) => b.last_update - a.last_update)
  };
};
