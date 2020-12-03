const { spawn } = require('child_process')
const { startGroup, endGroup } = require('@actions/core')
const path = require('path')

const pathToScript = path.join(__dirname, 'publish.sh')

async function main () {
  startGroup('Determining update type')
  process.env.UPDATE_TYPE = getUpdateType(process.env.COMMIT_MSG)
  endGroup()

  await new Promise((resolve, reject) => {
    const proc = spawn('bash', [pathToScript])
    proc.stdout.on('data', log)
    proc.stderr.on('data', log)
    proc.on('error', console.log)
    proc.on('exit', code => {
      if (code !== 0) {
        reject(new Error(code))
      }
      resolve(code)
    })
  })
}

function getUpdateType (commitMsg) {
  const tags = ['*patch*', '*minor*', '*major*']
  console.log('INFO: determining update type from commit message pattern...')
  const commitMsgTag = commitMsg ? commitMsg.slice(0, 7) : '*patch*'
  const updateType = tags.includes(commitMsgTag) ? commitMsgTag.replace(new RegExp(/\*/, 'g'), '') : 'patch'
  console.log(`SUCCESS: update type looks to be ${updateType}`)
  return updateType
}

function log (data) {
  console.log(data.toString().trim())
}

main().catch(() => {
  process.exit(1)
})
