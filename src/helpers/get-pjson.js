const { readFileSync } = require('fs')

module.exports = () => {
  return JSON.parse(readFileSync('package.json', 'utf8'))
}
