const { spawn } = require('child_process')
const path = require('path')

async function main () {
  const pathToScript = path.join(__dirname, 'publish.sh')
  const tags = ['*patch*', '*minor*', '*major*']
  const commitMsgTag = process.env.COMMIT_MSG ? process.env.COMMIT_MSG.slice(0, 7) : '*patch*'
  process.env.UPDATE_TYPE = tags.includes(commitMsgTag) ? commitMsgTag.replace(new RegExp(/\*/, 'g'), '') : 'patch'

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

function log (data) {
  console.log(data.toString().trim())
}

main().catch(() => {
  process.exit(1)
})
