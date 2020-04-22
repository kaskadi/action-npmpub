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
    CUSTOM_MSG="Upgraded to $CURRENT_VERSION"
    if [ "$GPG_ID" -a "$GPG_PASS" ]
    then
      git config --global user.signingkey $GPG_ID
      git config --global commit.gpgsign true
      git commit -S -m $CUSTOM_MSG <<<$GPG_PASS
    else
      git commit -m $CUSTOM_MSG
    fi
    git push
  fi
fi
npm publish --access public
