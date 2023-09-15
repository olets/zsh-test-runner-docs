---
title: Commands
head:
  - tag: title
    content: "Commands :: zsh-test-runner"
---

:::caution
These are the docs for the unreleased `next` version of zsh-test-runner.

For the current release's documentation see <https://zsh-test-runner.olets.dev>.
:::

## `clear-queue`

Clear the queue.

## `clear-summary`

```shell
ztr clear-summary
```

Clear results.

```shell
% ztr test true
PASS true
% ztr clear-summary
% ztr test false
FAIL false
% ztr summary
1 test total
1 (100%) failed
0 were skipped
0 passed
```

## `help`

```shell
ztr ( --help | -h | help)
```

Show the manpage.

## `queue`

```shell
ztr queue [[(--quiet | -q)] <arg> [--emulate <shell>] [--quiet-emulate] [<name> [<notes>]]]
```

Without arguments: print the queued tests.

With arguments: as `ztr test` but the test is queued rather than run.

See also [`run-queue`](#run-queue).

## `run-queue`

```shell
ztr run-queue [(--quiet | -q)]
```

Run all queued tests, and then clear the queue.

`--quiet` runs all tests with [the `--quiet` flag](#quieting-tests).

See also [`queue`](#queue).

### Bootstrap and clean

If `ZTR_BOOTSTRAP_FN` is defined, it is run before the first queued test.

If `ZTR_CLEAN_FN` is defined, it is run after the last queued test.

## `skip`

```shell
ztr skip [(--quiet | -q)] <arg> [<name> [<notes>]]
```

Skip `<arg>`. Pretty-print result and notes unless "quiet".

```shell
% ztr skip my_test
SKIP my_test
```

### Quieting skips

See [`test` command](#test).

### Named skips

See [`test` command](#test).

### Skip notes

See [`test` command](#test)

## `summary`

```shell
ztr summary
```

Pretty-print summary of results.

```shell
% ztr test true
PASS true
% ztr test false
FAIL false
% ztr summary
2 tests total
1 (50%) failed
0 were skipped
1 (50%) passed
```

## `test`

```shell
ztr test [(--quiet | -q)] [--emulate <shell>] [--quiet-emulate] <arg> [<name> [<notes>]]
```

Test `<arg>`. Pretty-print result and notes unless "quiet".

```shell
% ztr test true
PASS true
% ztr test false
FAIL false
```

In practice `<arg>` will most likely be a shell test expression.

```shell
% ztr test '[[ 1 == 1 ]]'
PASS [[ 1 == 1 ]]
```

:::caution
`<arg>` is evaluated in the current shell, with `eval`. This can lead to unintended side effects. See [Running Test Suites](/usage/test-suites).
:::

```shell
% ztr test [[ 1 == 1 ]]
zsh: = not found # same error you get if you run `eval [[ 1 == 1 ]]`
% ztr test '[[ 1 == 1 ]]'
PASS [[ 1 == 1 ]]
```

`<arg>` can be a value, a function, a `[ ]` or `[[ ]]` test, anything that you can pass to `eval`.

```shell
% ztr test 'test -f myfile.txt'
% ztr test '[ -f myfile.txt ]'
% ztr test '[[ -f myfile.txt ]]'
% ztr test my_function
# etc
```

Choose your quote level to control what is logged.

```shell
% my_var=1
% ztr test "[[ $my_var == 1 ]]"
PASS [[ 1 == 1 ]]
% ztr test '[[ $my_var == 1 ]]'
PASS [[ $my_var == 1 ]]
```

A passing test has a passing exit code; a failing test has a failing exit code:

```shell
% ztr test true 'passing exit code'
PASS passing exit code
% echo $?
0
% ztr test false 'failing exit code'
FAIL failing exit code
% echo $?
1
```

### Setup and teardown

If `ZTR_SETUP_FN` is defined, `ZTR_SETUP_FN $ZTR_SETUP_ARGS` runs before `<arg>` is evaluated.

If `ZTR_TEARDOWN_FN` is defined, `ZTR_TEARDOWN_FN $ZTR_TEARDOWN_ARGS` runs before `<arg>` is evaluated.


### Quieting tests

```shell
ztr test (--quiet | -q)
```

Optionally silence output.

```shell
% ztr test true
PASS true
% ztr test --quiet true
% ztr test true
PASS true
```

### Testing with shell emulation

```shell
ztr test --emulate <shell>
```

Use one of zsh's emulation modes (see "`emulate`" in [_The Z Shell Manual_, chapter 17 "Shell Builtin Commands"](http://zsh.sourceforge.net/Doc/Release/Shell-Builtin-Commands.html#Shell-Builtin-Commands)).

For example, `<shell>` could be `csh`, `ksh`, or `sh`.

> Note that zsh's `emulate` builtin treats anything starting with `s` or `b` is treated as `sh` (the **B**ourne **s**hell).

If an unsupported option is passed, `zsh` is the fallback. If anything other than `zsh` is used a note is printed after the result, indented.

The following examples rely on the fact that when called without any arguments the zsh builtin `emulate` prints the current emulation mode.

```shell
% ztr test '[[ $(emulate) == zsh ]]'
PASS [[ $(emulate) == zsh ]]
% ztr test --emulate sh '[[ $(emulate) == zsh ]]'
FAIL [[ $(emulate) == zsh ]]
    emulation mode: sh
% ztr test --emulate sh '[[ $(emulate) == sh ]]'
PASS [[ $(emulate) == sh ]]
    emulation mode: sh
```

If you regularly emulate a different shell, consider setting `ZTR_EMULATION_MODE` instead of always passing the `--emulate` option (see [Configuration](/reference/configuration/)).

#### Quieting shell emulation

```shell
ztr test --quiet-emuluate
```

Optionally do not warn when a non-zsh shell is emulated.

```
% ztr test --emulate sh --quiet-emulate '[[ $(emulate) == zsh ]]'
FAIL [[ $(emulate) == zsh ]]
```

### Named tests

```shell
ztr test <arg> <name>
```

Optionally pass a name as a second parameter.

```shell
% ztr test '[[ 1 == 1 ]]' '<name> appears instead of <arg>'
PASS <name> appears instead of <arg>
```

### Test notes

```shell
ztr test <arg> <name> <notes>
```

Optionally pass notes as a third parameter. For example, noting dependencies can help with troubleshooting. In the output notes are indented.

```shell
% cat my_tests.ztr
# --- snip ---
ztr test my_test_10
# --- snip ---
ztr test my_test_20 my_test_20 'Dependencies: my_test_10'
# --- snip ---
ztr test my_test_30 my_test_30 'Dependencies: my_test_10'
# --- snip ---

% ./my_tests.ztr
# --- snip ---
FAIL my_test_10
# --- snip ---
FAIL my_test_20
    'Dependencies: my_test_10'
# --- snip ---
FAIL my_test_30
    'Dependencies: my_test_10'
# Ok let's see if fixing my_test_10 fixes my_test_20 and my_test_30
```

## `version`

```shell
ztr ( --version | -v | version )
```

Print the command name and current version.
