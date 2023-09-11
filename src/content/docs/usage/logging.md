---
title: Logging results to a file
tableOfContents: false
---

To write a log to a file, redirect the zsh-test-runner output. To prevent ANSI codes from cluttering the log, disable `ztr`'s color support (see [configuration variables](#configuration)).

If you are not already disabling colored output, do so for the context of the test suite and redirect the output:

```shell
# to run the tests in the current shell
% NO_COLOR= . ./suite.ztr.zsh > ./suite.ztr.log

# or run the tests in a subshell
# see "Running Test Suites" for how to use $ZSH_PATH
% NO_COLOR= zsh_path=$ZSH_PATH zsh ./suite.ztr.zsh > ./suite.ztr.log
```

Otherwise —if you are already disabling colored output— run as usual but redirect output:

```shell
# to run the tests in the current shell
% . ./suite.ztr.zsh > ./suite.ztr.log

# or run the tests in a subshell
# see "Running Test Suites" for how to use $ZSH_PATH
% zsh_path=$ZSH_PATH zsh ./suite.ztr.zsh > ./suite.ztr.log
```