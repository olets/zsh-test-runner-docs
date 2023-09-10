---
title: Usage
---

```shell
# Clear results.
ztr clear

# Skip `<arg>`. Pretty-print result and notes unless "quiet".
ztr skip ([--quiet | -q)] [--emulate <shell>] [--quiet-emulate] </shell><arg> [<name> [<notes>]]

# Pretty-print summary of results
ztr summary

# Test `<arg>`. Pretty-print result and notes unless "quiet".
ztr test ([--quiet | -q)] <arg> [<name> [<notes>]]
```

### Commands

#### `clear`

Clear results.

```shell
% ztr test true
PASS true
% ztr clear
% ztr test false
FAIL false
% ztr summary
1 test total
1 (100%) failed
0 were skipped
0 passed
```

#### `skip [(--quiet | -q)] <arg> [<name> [<notes>]]`

Skip `<arg>`. Pretty-print result and notes unless "quiet".

```shell
% ztr skip my_test
SKIP my_test
```

See [`test` command](#test) for details about `--quiet`, `<name>`, and `<notes>`.

#### `summary`

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

#### `test [(--quiet | -q)] [--emulate <shell>] [--quiet-emulate] <arg> [<name> [<notes>]]`

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

Note that `<arg>` is passed to `eval`, so 1) don't pass something you don't want to `eval` and 2) watch out for quotation errors.

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

##### `(--quiet | -q)`

Optionally silence output.

```shell
% ztr test true
PASS true
% ztr test --quiet true
% ztr test true
PASS true
```

##### `--emulate <shell>`

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
```

If you always emulate a different shell, consider setting `ZTR_EMULATION_MODE` instead of always passing the `--emulate` option.

#### `--quiet-emulate`

Optionally do not warn when a non-zsh shell is emulated.

```
% ztr test --emulate sh --quiet-emulate '[[ $(emulate) == zsh ]]'
FAIL [[ $(emulate) == zsh ]]
```

##### `<name>`

Optionally pass a name as a second parameter.

```shell
% ztr test '[[ 1 == 1 ]]' '<name> appears instead of <arg>'
PASS <name> appears instead of <arg>
```

##### `<notes>`

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

#### `( --help | -h | help)`

Show the manpage.

#### `( --version | -v | version )`

Print the command name and current version.

### Variables

#### Results

| Variable      | Type              | Default                                 | Use                 |
| ------------- | ----------------- | --------------------------------------- | ------------------- |
| `ZTR_RESULTS` | associative array | `( [failed]=0 [passed]=0 [skipped]=0 )` | The running results |

Note that "tests" in the above are not necessarily unique:

```shell
% ztr test true --quiet
% echo $ZTR_RESULTS[passed]
1
% ztr test true --quiet
% echo $ZTR_RESULTS[passed]
2
```

Use `ztr clear` to zero out results:

```shell
% ztr test true --quiet
% ztr clear
% echo $ZTR_RESULTS
0 0 0
```

`ZTR_RESULTS[failed]` is a convenient way to check for 100% pass rate:

```
% (( ZTR_RESULTS[failed] )) || echo all tests pass
```

#### Configuration

| Variable                   | Type    | Default    | Use                                                                                                                                                                                                                |
| -------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NO_COLOR`                 | any     | undeclared | To suppress color output, set to any value or simply declare (`NO_COLOR=`), for example in `.zshrc`.<br>See [Running test suites](#running-test-suites) for other uses, and <https://no-color.org/> for more info. |
| `ZTR_DEBUG`                | integer | `0`        | If non-zero, print debugging messages                                                                                                                                                                              |
| `ZTR_EMULATION_MODE`       | string  | `zsh`      | The emulation mode to use                                                                                                                                                                                          |
| `ZTR_QUIET`                | integer | `0`        | If non-zero, use quiet mode without passing `--quiet`                                                                                                                                                              |
| `ZTR_QUIET_EMULATION_MODE` | integer | `0`        | If non-zero, use quiet emulation mode without passing `--quiet-emulate`                                                                                                                                            |

#### Other

| Variable   | Type   | Use                                                       |
| ---------- | ------ | --------------------------------------------------------- |
| `ZTR_PATH` | string | `source $ZTR_PATH` in scripts that include `ztr` commands |