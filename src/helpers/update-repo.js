module.exports = (utils) => {
  const repo = process.env.GITHUB_REPOSITORY
  const { startGroup, endGroup } = utils
  startGroup(`Updating ${repo}`)
  stage(utils)
  commit(utils)
  push(utils, repo)
  endGroup()
}

function stage ({ cliOp }) {
  console.log('INFO: staging package.json and package-lock.json files...')
  cliOp('git', ['add', 'package.json'])
  cliOp('git', ['add', 'package-lock.json'])
  console.log('SUCCESS: files successfully staged!')
}

function commit ({ getPjson, cliOp, spawnSync }) {
  console.log('INFO: commiting new files...')
  const { version } = getPjson()
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitArgs = ['commit', '-m', `Upgraded to ${version}`]
  commitArgs = gpgSign.length > 0 ? [...commitArgs.slice(0, 1), '-S', ...commitArgs.slice(1)] : commitArgs
  cliOp('git', commitArgs)
  console.log('SUCCESS: files successfully commited!')
}

function push ({ cliOp }, repo) {
  console.log(`INFO: pushing new files to ${repo}`)
  cliOp('git', ['push'])
  console.log('SUCCESS: files successfully pushed!')
}
