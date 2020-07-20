function main() {
  const pjson = require('./package.json')
  const { execSync } = require('child_process')
  if (pjson.devDependencies) {
      Object.keys(pjson.devDependencies).forEach(dep => { execSync(`npm i -D ${dep}@latest`) }, { stdio: 'inherit' })
  }
  if (pjson.dependencies) {
      Object.keys(pjson.dependencies).forEach(dep => { execSync(`npm i -S ${dep}@latest`) }, { stdio: 'inherit' })
  }
}

main()
