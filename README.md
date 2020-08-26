[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/build?label=build&logo=mocha)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-npmpub?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-npmpub?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-npmpub?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-npmpub?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-npmpub/?mode=list)

***

# What is this action for?

It allows you to automatically publish your package to NPM.

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: 12
        registry-url: https://registry.npmjs.org/
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-npmpub@master
      with:
        username: {GITHUB-NAME}
        email: {GITHUB-EMAIL}
      env:
        NODE_AUTH_TOKEN: ${{ secrets.{YOUR-NPM-TOKEN} }}
        COMMIT_MSG: ${{ github.event.head_commit.message }}
```

**Notes:**
- everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
- by default, this action will publish a new _patch_ for your package. If you would like to publish a new _major_ (resp. _minor_) version for this package, just prepend your commit message with `*major*` (resp. `*minor*`). This works as well with `*patch*` even though it's not required

**Inputs:**
|    Input   | Required | Default | Description                                         |
|:----------:|:--------:|:-------:|-----------------------------------------------------|
| `username` |    Yes   |   N/A   | Username to commit upgraded version files on GitHub |
|   `email`  |    Yes   |   N/A   | Email to commit upgraded version files on GitHub    |

**Environment variables:**
|      Variable     | Required | Description                                                                                                                                                                                                              |
|:-----------------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NODE_AUTH_TOKEN` |    Yes   | NPM token which has **read & publish** permission. See [here](https://docs.npmjs.com/creating-and-viewing-authentication-tokens) for details on how to generate a token. **Recommend storing it in repository secrets!** |
|    `COMMIT_MSG`   |    Yes   | Message of the commit that triggered the action. **/!\ This should not be modified! /!\\**                                                                                                                               |
