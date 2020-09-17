#!/bin/bash
getVersion() {
  node -e "console.log(require('./package.json').version)"
}
# compare current and remote version
PACKAGE_NAME="$(node -e "console.log(require('./package.json').name)")"
CURRENT_VERSION="$(getVersion)"
REMOTE_VERSION="$(npm view $PACKAGE_NAME version)"
if [ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]
then
  npm --no-git-tag-version version $UPDATE_TYPE
  if [ "$GITHUB_ACTIONS" == "true" ]
  then
    CURRENT_VERSION="$(getVersion)"
    git config --global user.name $INPUT_USERNAME
    git config --global user.email $INPUT_EMAIL
    git add package.json
    git add package-lock.json
    git commit -m "Upgraded to $CURRENT_VERSION"
    git push
  fi
fi
npm publish --access public