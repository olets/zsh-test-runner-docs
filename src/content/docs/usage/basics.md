---
title: Usage basics
head:
  - tag: title
    content: "Basics :: zsh-test-runner"
---

:::tip
A new major version of zsh-test-runner is in the works. Learn about it now at  
https://next.zsh-test-runner.olets.dev
:::

The three essential zsh-test-runner commands are [`ztr test`](/reference/commands/#test), [`ztr summary`](/reference/commands/#summary), and [`ztr clear-summary`](/reference/commands/#clear-summary).

`ztr test` runs a test. `ztr summary` prints statistics about the `ztr test` tests run since the last `ztr clear-summary`.

You can also build up a [queue of tests](/reference/commands/#queue), and specify [bootstrap and clean functions](/reference/commands/#bootstrap-and-clean) (run at the start and end of the queue, respectively) and [setup and teardown functions](/reference/commands/#setup-and-teardown) (run before and after each test, respectively).

## Minimal usage

1. Clear the summary
    ```shell
    % ztr clear-summary
    ```
1. Run some tests, using the format `ztr test <expression to test>`
    ```shell
    % x=2
    % ztr test '(( x == 2 ))'
    PASS (( x == 2 ))
    % ztr test '[[ $x == 1 ]]'
    FAIL [[ $x == 1 ]]
    ```
    :::caution
    The test expression is evaluated in the current shell  with `eval`. This can lead to side effects. See [Things to know](#things-to-know), below, for details.
    :::
1. Print the results
    ```shell
    % ztr summary
    4 tests total
    1 (25%) failed
    0 were skipped
    3 (75%) passed
    ```

## Queue

You can build up a queue of tests to run all at once.

```shell
% x=2
% ztr clear-summary
% ztr queue "'(( x == 2 ))'"
% ztr queue "'[[ \$x == 1 ]]'"
% ztr queue
ztr test '(( x == 2 ))'
ztr test '[[ $x == 1 ]]'
% ztr run-queue
PASS (( x == 2 ))
FAIL [[ $x == 1 ]]
% ztr summary
2 tests total
1 (50%) failed
0 were skipped
1 (50%) passed
```

## Typical usage

zsh-test-runner tests are typically run as part of a test suite, with the `ztr` commands living in a `<name>.ztr.zsh` file. For more on that, see [Running Test Suites](/usage/test-suites).

## Things to know

The `ztr test` expression argument is evaluated. 

```shell
% x=2
% ztr test 'x=1'
PASS x=1
% echo $x
1 # side effect
```

That may cause unwanted side effects.

Make careful use of quotation levels.

Consider saving any context you'll be manipulating, and restoring the saved values after testing.

Or [run tests in a subshell](/usage/test-suites/#running-the-test-suite-in-a-subshell).