const getUpdateType = require('./helpers/get-update-type.js')
const publish = require('./helpers/publish.js')
const core = require('@actions/core')

const updateType = getUpdateType(core, process.env.COMMIT_MSG)
publish(core, updateType)
