---
title: Usage basics
head:
  - tag: title
    content: "Basics :: zsh-test-runner"
---

The three essential zsh-test-runner commands are `ztr test`, `ztr summary`, and `ztr clear`.

`ztr test` runs a test. `ztr summary` prints statistics about the `ztr test` tests run since the last `ztr clear`.

## Minimal usage

1. Clear the summary
    ```shell
    % ztr clear
    ```
1. Run some tests, using the format `ztr test '<expression to test>'`
    ```shell
    % x=2
    % ztr test '(( x == 2 ))'
    PASS (( x == 2 ))
    % ztr test '[[ $x == 1 ]]'
    FAIL [[ $x == 1 ]]
    ```
    > ⚠️ Heads up: _the tested is expression is evaluated_. This can lead to side effects. Read on for details.
1. Print the results
    ```shell
    % ztr summary
    4 tests total
    1 (25%) failed
    0 were skipped
    3 (75%) passed
    ```

## Typical usage

zsh-test-runner tests are typically run as part of a test suite, with the `ztr` commands living in a `<name>.ztr.zsh` file. For more on that, see [Running Test Suites](/usage/running-test-suites).

## Things to know

The `ztr test` expression argument is evaluated. 

```shell
% x=2
% ztr test 'x=1' # `x` is now equal to 1
PASS x=1
% echo $x
1
```

That may cause unwanted side effects.

Consider saving any context you'll be manipulating, and restoring the saved values after testing.

Or [run tests in a subshell](/reference/running-test-suites#running-the-test-suite-in-a-subshell).