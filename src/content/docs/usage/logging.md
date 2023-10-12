---
title: Logging results to a file
tableOfContents: false
head:
  - tag: title
    content: "Logging :: zsh-test-runner"
---

:::caution
These are the docs for the unreleased `next` version of zsh-test-runner.

For the latest release's documentation see https://zsh-test-runner.olets.dev.
:::

To write a coverage report to a file, redirect the zsh-test-runner output. To prevent ANSI codes from cluttering the log, disable `ztr`'s color support (see [Configuration](/reference/configuration)).

If you are not already disabling colored output, do so for the context of the test suite and redirect the output:

```shell
# to run the tests in the current shell
% NO_COLOR= . ./suite.ztr.zsh > ./suite.ztr.log

# or run the tests in a subshell
# see "Running Test Suites" for how to use $ZSH_PATH
% NO_COLOR= ztr_path=$ZTR_PATH zsh ./suite.ztr.zsh > ./suite.ztr.log
```

Otherwise —if you are already disabling colored output— run as usual but redirect output:

```shell
# to run the tests in the current shell
% . ./suite.ztr.zsh > ./suite.ztr.log

# or run the tests in a subshell
# see "Running Test Suites" for how to use $ZSH_PATH
% ztr_path=$ZTR_PATH zsh ./suite.ztr.zsh > ./suite.ztr.log
```