const core = require('@actions/core')
const github = require('@actions/github')
const parse = require('parse-diff')

async function run() {
  try {
    const keyword = core.getInput('keyword')
    const message = core.getInput('message')

    const myToken = core.getInput('github-token')
    const octokit = github.getOctokit(myToken)

    const diff_url = github.context.payload.pull_request.diff_url
    const result = await octokit.rest.pulls.get(diff_url)
    const files = parse(result.data)
    core.exportVariable('files', files)

    let changes = ''
    for (const file of files) {
      core.info(`${keyword} file compare: ${file} ${file.to.indexOf(keyword)}`)
      if (file.to.indexOf(keyword) >= 0) {
        core.setFailed(message || `The code contains ${keyword}`)
      }
      for (const chunk of file.chunks) {
        for (const change of chunk.changes) {
          if (change.add) {
            changes += change.content
          }
        }
      }
    }

    if (changes.indexOf(keyword) >= 0) {
      core.setFailed(message || `The code contains ${keyword}`)
    }
  } catch (error) {
    core.setFailed(error)
  }
}

run()
