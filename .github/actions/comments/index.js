const core = require('@actions/core');
const octokit = require('@octokit/core');

try {
  const name = core.getInput('name');
  const body = core.getInput('body');
  const url = core.getInput('url');
  const issue_number = 28

  console.log(`
    ---
    name: ${name}
    url: ${url}
    ---
    ${body}
  `)

  octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: 'andy-polhill',
    repo: 'andy-polhill.github.io',
    issue_number,
    body: `
    ---
    name: ${name}
    url: ${url}
    ---
    ${body}
    `
  }).then(response => {
    console.log(response.status)
  }).catch(error => {
    console.error(error)
  });

} catch (error) {
  core.setFailed(error.message);
}