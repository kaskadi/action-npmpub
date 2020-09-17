[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/build?label=build&logo=mocha)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Abuild)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-npmpub?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-npmpub?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-npmpub?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-npmpub?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-npmpub/?mode=list)

***

# What is this action for?

This action allows you to automatically publish your packages to NPM.

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```yaml
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-npmpub@master
      with:
        username: {USERNAME-VALUE}
        email: {EMAIL-VALUE}
      env:
        NODE_AUTH_TOKEN: {NODE_AUTH_TOKEN-VALUE}
        COMMIT_MSG: ${{ github.event.head_commit.message }}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|    Input   | Required | Default | Description                                         |
| :--------: | :------: | :-----: | :-------------------------------------------------- |
| `username` |  `true`  |         | Username to commit upgraded version files on GitHub |
|   `email`  |  `true`  |         | Email to commit upgraded version files on GitHub    |

**Environment variables:**
|      Variable     | Required | Description                                                                                                                                                                                                              |
| :---------------: | :------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_AUTH_TOKEN` |  `true`  | NPM token which has **read & publish** permission. See [here](https://docs.npmjs.com/creating-and-viewing-authentication-tokens) for details on how to generate a token. **Recommend storing it in repository secrets!** |
|    `COMMIT_MSG`   |  `true`  | Message of the commit that triggers the action. **\/!\\ This should not be changed \/!\\**                                                                                                                               |

By default, this action will publish a new _patch_ for your package. If you would like to publish a new _major_ (resp. _minor_) version for this package, just prepend your commit message with `*major*` (resp. `*minor*`). This works as well with `*patch*` even though it's not required.