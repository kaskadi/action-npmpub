[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/build?label=build&logo=mocha)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Abuild)
[![Static code analysis status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/analyze-code?label=codeQL&logo=github)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Aanalyze-code)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-npmpub/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-npmpub/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-npmpub?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-npmpub?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub)
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-npmpub?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-npmpub) -->

***

{{>main}}
By default, this action will publish a new _patch_ for your package. If you would like to publish a new _major_ (resp. _minor_) version for this package, just prepend your commit message with `*major*` (resp. `*minor*`). This works as well with `*patch*` even though it's not required.