module.exports = ({ startGroup, endGroup, cliOp }) => {
  startGroup('Publishing package to NPM')
  cliOp('npm', ['publish', '--access', 'public'])
  endGroup()
}
