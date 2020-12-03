module.exports = ({ startGroup, endGroup }, commitMsg) => {
  startGroup('Determining update type')
  const tags = ['*patch*', '*minor*', '*major*']
  console.log('INFO: determining update type from commit message pattern...')
  let commitMsgTag = ''
  if (commitMsg && commitMsg.length > 0) {
    commitMsgTag = commitMsg.slice(0, 7)
  }
  const updateType = tags.includes(commitMsgTag) ? commitMsgTag.replace(new RegExp(/\*/, 'g'), '') : 'patch'
  console.log(`SUCCESS: update type looks to be ${updateType}`)
  endGroup()
  return updateType
}
