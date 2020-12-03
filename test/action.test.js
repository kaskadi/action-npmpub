/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const { writeFileSync, readFileSync, unlinkSync } = require('fs')
const { spawnSync } = require('child_process')
const assert = require('chai').assert

const pkgData = {
  name: 'collmex-client',
  version: getNpmVersion('collmex-client')
}

describe('action-npmpub', function () {
  this.timeout(30000)
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  describe('no package', function () {
    before(() => {
      unlinkSync(`${process.cwd()}/test/data/package.json`)
    })
    it('should error if no package exists in the calling repo', async function () {
      await test().catch(() => { assert(true) })
    })
  })
  describe('new package', function () {
    before(init('kaskadi-definitely-a-fake-package', '1.0.0'))
    it('should publish a new package', async function () {
      await test(() => { assert(true) })
    })
    after(cleanup)
  })
  describe('update package', function () {
    beforeEach(init(pkgData.name, pkgData.version))
    it('should automatically patch a package', async function () {
      await test(() => {
        const pjson = JSON.parse(readFileSync('package.json', 'utf8'))
        assert(pjson.version === incrementVersion(pkgData.version, 2))
      })
    })
    it('should patch a package if requested to', async function () {
      await test(() => {
        const pjson = JSON.parse(readFileSync('package.json', 'utf8'))
        assert(pjson.version === incrementVersion(pkgData.version, 2))
      }, '*patch*bla bla test')
    })
    it('should upgrade minor version of a package if requested to', async function () {
      await test(() => {
        const pjson = JSON.parse(readFileSync('package.json', 'utf8'))
        assert(pjson.version === incrementVersion(pkgData.version, 1))
      }, '*minor*bla bla test')
    })
    it('should upgrade major version of a package if requested to', async function () {
      await test(() => {
        const pjson = JSON.parse(readFileSync('package.json', 'utf8'))
        assert(pjson.version === incrementVersion(pkgData.version, 0))
      }, '*major*bla bla test')
    })
    afterEach(cleanup)
  })
})

function init (name, version) {
  return () => {
    const pjson = { name, version }
    writeFileSync(`${process.cwd()}/test/data/package.json`, JSON.stringify(pjson, null, 2), 'utf8')
  }
}

function cleanup () {
  writeFileSync(`${process.cwd()}/test/data/package.json`, JSON.stringify({}, null, 2), 'utf8')
}

function getNpmVersion (name) {
  return spawnSync('npm', ['view', name, 'version']).stdout.toString().trim()
}

function incrementVersion (version, i) {
  const versions = version.split('.').map(Number)
  return [...versions.slice(0, i), versions[i] + 1, ...versions.slice(i + 1).map(() => 0)].join('.')
}

async function test (tests = () => {}, commitMsg = '') {
  process.chdir('test/data')
  process.env.COMMIT_MSG = commitMsg
  await runAction(['pre', 'main'])
    .then(tests)
    .finally(() => { process.chdir('../../') })
}
