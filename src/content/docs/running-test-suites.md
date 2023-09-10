---
title: Running test suites
---

You can run a test suite from a file. The following examples suppose the file is in the current working directory; adjust the path to fit your situation.

> ℹ️ Tip: Most test suites should start with `ztr clear`.

1. Prepare your test suite.

    ```shell
    % cat suite.ztr
    my_test=false

    ztr clear
    ztr test true 'my first test'
    ztr test my_test 'my second test'
    ztr test 'my_test && true' 'my third test' 'depends on my second test'
    ztr skip my_other_test 'my other test' '@TODO build the api for this!'

    echo
    ztr summary
    ```

1. Run your test suite either by

    - sourcing it:

        ```shell
        % . ./suite.ztr # or the longhand `source ./suite.ztr`
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
        ```

        This method has advantage that the results are available to the parent shell. It has the potential disadvantage that any other side effects of your tests are not sandboxed.

        ```shell
        % zsh suite.ztr
        # --- snip ---
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

    - running it in a subshell

        > In this case you must explicitly source `ztr.zsh` in your test suite. zsh-test-runner provides the variable `ZTR_PATH` to make this easy

        ```shell
        % cat suite.ztr
        source $ZTR_PATH
        # --- snip ---
        ```

        To run the suite in a subshell pass the file to `zsh`:

        ```shell
        % zsh suite.ztr
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
        ```

        This method has the potential advantage of sandboxing your tests. It has the potential disadvantage that the results are not available to the parent shell.

        ```shell
        % zsh suite.ztr
        # --- snip ---
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

To write a log to a file simply redirect the zsh-test-runner output. To prevent ANSI codes from cluttering the log, disable `ztr`'s color support (see [configuration variables](#configuration)).

-   if you have already disabled colored output, run the tests:

    ```shell
    % . ./suite.ztr > ./suite.ztr.log # or `zsh` instead of `.`
    ```

-   if you have not already disabled colored output, do so temporarily while running the tests:

    ```shell
    % NO_COLOR=
    % . ./suite.ztr > ./suite.ztr.log # or `zsh` instead of `.`
    % unset NO_COLOR
    ```

### Examples

[`zsh-abbr`](https://github.com/olets/zsh-abbr) uses zsh-test-runner for its test suite. For a real world example of `ztr` use, check out [`zsh-abbr/tests/abbr.ztr`](https://github.com/olets/zsh-abbr/blob/main/tests/abbr.ztr).