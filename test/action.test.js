/* eslint-env mocha */
if (!process.env.NODE_AUTH_TOKEN) {
  throw new Error('NODE_AUTH_TOKEN environment variable is not defined')
}
if (!process.env.COMMIT_MSG) {
  throw new Error('COMMIT_MSG environment variable is not defined')
}
const runAction = require('./helpers/run-action.js')
const steps = ['pre', 'main']
const ncp = require('ncp').ncp
const fs = require('fs')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

describe('template-action', function () {
  this.timeout(5000)
  describe('new package', function () {
    before(async function () {
      init()
    })
    it('should publish a new package', function () {
      
    })
    after(async function () {
      rimraf.sync('test/working-data')
    })
  })
  describe('auto patch on existing package', function () {
    before(async function () {
      init()
    })
    it('should auto patch an existing package', function () {

    })
    after(async function () {
      rimraf.sync('test/working-data')
    })
  })
  describe('requested patch on existing package', function () {
    before(async function () {
      init('*patch*bla bla test')
    })
    it('should patch an existing package when asked to', function () {

    })
    after(async function () {
      rimraf.sync('test/working-data')
    })
  })
  describe('requested minor upgrade on existing package', function () {
    before(async function () {
      init('*minor*bla bla test')
    })
    it('should upgrade minor version of an existing package when asked to', function () {

    })
    after(async function () {
      rimraf.sync('test/working-data')
    })
  })
  describe('requested major upgrade on existing package', function () {
    before(async function () {
      init('*major*bla bla test')
    })
    it('should upgrade major version of an existing package when asked to', function () {

    })
    after(async function () {
      rimraf.sync('test/working-data')
    })
  })
})

async function init (commitMsg = '') {
  await cp('test/data', 'test/working-data')
  await new Promise(resolve => setTimeout(resolve, 300)) // it seems like ncp still does some async tasks even though the ncp function returned so we wait a little until everything is copied
  process.chdir('test/working-data')
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  this.oldPackageName = pjson.name
  this.oldVersion = pjson.version
  process.env.COMMIT_MSG = commitMsg
  runAction(steps)
  process.chdir('../../')
}

function cp (src, dest) {
  return new Promise((resolve, reject) => {
    ncp(src, dest, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
