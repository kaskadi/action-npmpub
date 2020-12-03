const { spawnSync } = require('child_process')

module.exports = (cli, args) => {
  if (process.env.TEST_ENV) {
    args = [...args.slice(0, 1), '--dry-run', ...args.slice(1)]
  }
  return spawnSync(cli, args, { stdio: 'inherit' })
}
