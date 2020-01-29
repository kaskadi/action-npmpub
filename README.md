![](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/update?label=dependencies%20updated&logo=npm)

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
name: YOUR-ACTION-NAME
on: [YOUR-ACTION-EVENT]
jobs:
publish:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@v2
  - uses: actions/setup-node@v1
    with:
      node-version: 12
      registry-url: https://registry.npmjs.org/
  - name: Publish to NPM
    uses: kaskadi/action-npmpub@master
    with:
      USERNAME: [FIRST-NAME] [LAST-NAME] **required**
      EMAIL: [GITHUB-EMAIL for commit] **required**
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

_USERNAME_ and _EMAIL_ are inputs used by this action to commit on your repository the upgraded files under your identity.

_NPM_TOKEN_ is a secret that stores a token you generated on your NPM registry with which you can **read and publish** to this registry.
See [here](https://docs.npmjs.com/creating-and-viewing-authentication-tokens) for details on how to generate a token.
