const core = require('@actions/core')
const { spawnSync } = require('child_process')
const cliOp = require('./helpers/cli-op.js')
const getPjson = require('./helpers/get-pjson.js')
const utils = { ...core, spawnSync, cliOp, getPjson }

const getUpdateType = require('./helpers/get-update-type.js')
const getVersions = require('./helpers/get-versions.js')
const upgradeVersion = require('./helpers/upgrade-version.js')
const updateRepo = require('./helpers/update-repo.js')
const publish = require('./helpers/publish.js')

const updateType = getUpdateType(utils, process.env.COMMIT_MSG)
const { version, npmVersion } = getVersions(utils)
if (version === npmVersion) {
  upgradeVersion(utils, updateType)
  updateRepo(utils)
}
publish(utils)
