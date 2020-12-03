const { spawnSync } = require('child_process')
const { existsSync, readFileSync } = require('fs')

module.exports = (core, updateType) => {
  const { version, npmVersion } = getVersions(core)
  if (version === npmVersion) {
    upgradeVersion(core, updateType)
    pushChanges(core)
  }
  publish(core)
}

function getPjson () {
  return JSON.parse(readFileSync('package.json', 'utf8'))
}

function getVersions ({ startGroup, endGroup, error }) {
  startGroup('Comparing local and remote versions of package')
  console.log('INFO: retrieving local and remote versions of package...')
  if (!existsSync('package.json')) {
    const errorMsg = 'This repository does not seem to be an NPM package'
    error(errorMsg)
    endGroup()
    throw new Error(`${errorMsg}, aborting...`)
  }
  const { name, version } = getPjson()
  const npmVersion = spawnSync('npm', ['view', name, 'version']).stdout.toString().trim().replace('v', '')
  console.log('SUCCESS: local and remote versions retrieved!')
  endGroup()
  return { version, npmVersion }
}

function upgradeVersion ({ startGroup, endGroup }, updateType) {
  startGroup('Upgrading package version')
  console.log(`INFO: upgrading ${updateType} version of package...`)
  spawnSync('npm', ['--no-git-tag-version', 'version', updateType], { stdio: 'inherit' })
  console.log(`SUCCESS: ${updateType} version of package successfully upgraded!`)
  endGroup()
}

function pushChanges ({ startGroup, endGroup, getInput }) {
  const repo = process.env.GITHUB_REPOSITORY
  startGroup(`Pushing new package.json and package-lock.json to ${repo}`)
  if (process.env.GITHUB_ACTIONS) {
    console.log('INFO: configurating git user based on action inputs...')
    try {
      const username = getInput('username', { required: true })
      const email = getInput('email', { required: true })
      spawnSync('git', ['config', '--global', 'user.name', username], { stdio: 'inherit' })
      spawnSync('git', ['config', '--global', 'user.email', email], { stdio: 'inherit' })
      console.log(`SUCCESS: git user ${username} with email ${email} successfully configurated!`)
    } catch {
      endGroup()
    }
  }
  console.log('INFO: staging package.json and package-lock.json files...')
  cliOp('git', ['add', 'package.json'])
  cliOp('git', ['add', 'package-lock.json'])
  console.log('SUCCESS: files successfully staged!')
  console.log('INFO: commiting new files...')
  const { version } = getPjson()
  cliOp('git', ['commit', '-m', `Upgraded to ${version}`])
  console.log('SUCCESS: files successfully commited!')
  console.log(`INFO: pushing new files to ${repo}`)
  cliOp('git', ['push'])
  console.log('SUCCESS: files successfully pushed!')
  endGroup()
}

function publish ({ startGroup, endGroup }) {
  startGroup('Publishing package to NPM')
  cliOp('npm', ['publish', '--access', 'public'])
  endGroup()
}

function cliOp (cli, args) {
  if (process.env.TEST_ENV) {
    args = [...args.slice(0, 1), '--dry-run', ...args.slice(1)]
  }
  return spawnSync(cli, args, { stdio: 'inherit' })
}
