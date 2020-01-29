const exec = require('child_process').exec
exec('bash publish.sh', (error, stdout, stderr) => {
  console.log(stdout)
  if (error !== null) {
    console.log(stderr)
  }
})
