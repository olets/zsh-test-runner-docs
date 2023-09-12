---
title: Running test suites
head:
  - tag: title
    content: "Test suites :: zsh-test-runner"
---

You can run a test suite from a file. The following examples suppose the file is in the current working directory; adjust the path to fit your situation.

> ℹ️ Tip: Most test suites should start with `ztr clear`.

## Real world example

[`zsh-abbr`](https://github.com/olets/zsh-abbr) uses zsh-test-runner for its test suite. Check out [its test suite](https://github.com/olets/zsh-abbr/tree/main/tests) for a real world example of one way of writing zsh-test-runner test suites.

## Run your test suite

Either source your test suite or run it in a subshell

### Sourcing the test suite

In this method

- the `ztr summary` results _are_ available in the parent shell
- any side effects of your tests _are not_ sandboxed

The following example uses `ztr test`'s [`name`](reference/commands/#named-tests) and [`notes`](/reference/commands/#test-notes) options.

```shell
% cat ./suite.ztr.zsh
my_test=false

ztr clear
ztr test true 'my first test'
ztr test my_test 'my second test'
ztr test 'my_test && true' 'my third test' 'depends on my second test'
ztr skip my_other_test 'my other test' '@TODO build the api for this!'

echo
ztr summary
```

```shell
% . ./suite.ztr.zsh # or the longhand `source ./suite.ztr.zsh`
PASS my first test
FAIL my second test
FAIL my third test
    depends on my second test
SKIP my other test
    @TODO build the api for this!

4 tests total
2 (40%) failed
1 was skipped
1 (20%) passed

% ztr summary # suite's summary is available
4 tests total
2 (50%) failed
1 was skipped
1 (25%) passed

% echo $my_test # suite's context is available
false
```

### Running the test suite in a subshell

In this method

- the `ztr summary` results _are not_ available in the parent shell
- any side effects of your tests _are_ sandboxed

> When running zsh-test-runner in a subshell, explicitly source `ztr.zsh` in your test suite. zsh-test-runner provides the variable `ZTR_PATH` to make this easy

```shell
% cat ./suite.ztr.zsh
# run with `ztr_path=$ZTR_PATH zsh <path to this file>` && abbr load
. $ztr_path

# from here on is the same as the "Sourcing the test suite" example
my_test=false

ztr clear
ztr test true 'my first test'
ztr test my_test 'my second test'
ztr test 'my_test && true' 'my third test' 'depends on my second test'
ztr skip my_other_test 'my other test' '@TODO build the api for this!'

echo
ztr summary
```

To run the suite in a subshell pass the file to `zsh`, passing in the zsh-test-runner path as context, and then reload your user abbreviations:

```shell
% ztr_path=$ZTR_PATH zsh ./suite.ztr.zsh && abbr load
PASS my first test
FAIL my second test
FAIL my third test
    depends on my second test
SKIP my other test
    @TODO build the api for this!

4 tests total
2 (40%) failed
1 was skipped
1 (20%) passed

% ztr summary # suite's summary is not available
0 tests total
0 failed
0 were skipped
0 passed

% echo $my_test # suite's context is not available

%
```
