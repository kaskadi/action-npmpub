require('./helpers/install-dependencies.js')()
const childProc = require('child_process')
// test if we're in a GitHub Actions context so we can still test locally how the action is behaving
const root = process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY !== 'kaskadi/action-npmpub' ? '/home/runner/work/_actions/kaskadi/action-npmpub/master/' : `${process.cwd()}/`
const pathToScript = `${root}publish.sh`

const tags = ['*patch*', '*minor*', '*major*']
const commitMsgTag = process.env.COMMIT_MSG.slice(0, 7)
process.env.UPDATE_TYPE = tags.includes(commitMsgTag) ? commitMsgTag.replace(new RegExp(/\*/, 'g'), '') : 'patch'

childProc.exec(pathToScript, (err, stdout, stderr) => {
  console.log(stdout)
  if (err !== null) {
    console.log(stderr)
  }
})
