const { existsSync } = require('fs')

module.exports = ({ startGroup, endGroup, error, getPjson, spawnSync }) => {
  startGroup('Comparing local and remote versions of package')
  console.log('INFO: retrieving local and remote versions of package...')
  if (!existsSync('package.json')) {
    const errorMsg = 'This repository does not seem to be an NPM package'
    error(errorMsg)
    endGroup()
    process.exit(1)
  }
  const { name, version } = getPjson()
  const npmVersion = spawnSync('npm', ['view', name, 'version']).stdout.toString().trim().replace('v', '')
  console.log('SUCCESS: local and remote versions retrieved!')
  endGroup()
  return { version, npmVersion }
}
