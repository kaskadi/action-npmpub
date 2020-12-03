#!/bin/bash
# helpers
getVersion() {
  node -e "console.log(require('./package.json').version)"
}
getRemoteVersion() {
  npm view $1 version
}
getName() {
  node -e "console.log(require('./package.json').name)"
}
startLogGroup() {
  echo "::group::$1"
}
endLogGroup() {
  echo "::endgroup::"
}
# compare current and remote version
startLogGroup "Comparing local and remote versions of package"
echo "INFO: retrieving local and remote versions of package..."
PACKAGE_NAME="$(getName)"
CURRENT_VERSION="$(getVersion)"
REMOTE_VERSION="$(getRemoteVersion $PACKAGE_NAME)"
echo "SUCCESS: local and remote versions retrieved!"
endLogGroup
if [ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]
then
  startLogGroup "Upgrading package version"
  echo "INFO: upgrading $UPDATE_TYPE version of package..."
  npm --no-git-tag-version version $UPDATE_TYPE
  echo "SUCCESS: $UPDATE_TYPE version of package successfully upgraded!"
  endLogGroup
  if [ "$GITHUB_ACTIONS" == "true" ]
  then
    startLogGroup "Pushing new package.json and package-lock.json to $GITHUB_REPOSITORY"
    echo "INFO: configurating git user based on action inputs..."
    git config --global user.name $INPUT_USERNAME
    git config --global user.email $INPUT_EMAIL
    echo "SUCCESS: git user $INPUT_USERNAME with email $INPUT_EMAIL successfully configurated!"
    echo "INFO: staging package.json and package-lock.json files..."
    git add package.json
    git add package-lock.json
    echo "SUCCESS: files successfully staged!"
    echo "INFO: commiting new files..."
    CURRENT_VERSION="$(getVersion)"
    git commit -m "Upgraded to $CURRENT_VERSION"
    echo "SUCCESS: files successfully commited!"
    echo "INFO: pushing new files to $GITHUB_REPOSITORY"
    git push
    echo "SUCCESS: files successfully pushed!"
    endLogGroup
  fi
fi
startLogGroup "Publishing package to NPM"
npm publish --access public
endLogGroup
