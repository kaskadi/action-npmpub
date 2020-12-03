module.exports = ({ startGroup, endGroup, spawnSync }, updateType) => {
  startGroup('Upgrading package version')
  console.log(`INFO: upgrading ${updateType} version of package...`)
  spawnSync('npm', ['--no-git-tag-version', 'version', updateType], { stdio: 'inherit' })
  console.log(`SUCCESS: ${updateType} version of package successfully upgraded!`)
  endGroup()
}
