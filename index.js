const childProc = require('child_process')
// test if we're in a GitHub Actions context so we can still test locally how the action is behaving
const root = process.cwd().includes('/home/runner/work') ? '/home/runner/work/_actions/kaskadi/action-npmpub/master/' : './'
const pathToScript = `${root}publish.sh`

childProc.exec(pathToScript, (err, stdout, stderr) => {
  console.log(stdout)
  if (err !== null) {
    console.log(stderr)
  }
})
