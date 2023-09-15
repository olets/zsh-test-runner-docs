---
title: Configuration
tableOfContents: false
head:
  - tag: title
    content: "Configuration :: zsh-test-runner"
---

:::caution
These are the docs for the unreleased `next` version of zsh-test-runner.

For the latest release's documentation see <a href="https://zsh-test-runner.olets.dev">https://zsh-test-runner.olets.dev</a>.
:::

Variable | Type | Default | Use
---|---|---|---
`NO_COLOR` | any | undeclared | To suppress color output, set to any value or simply declare (`NO_COLOR=`), for example in `.zshrc`. Recommended when [logging coverage reports to a file](/usage/logging).
`ZTR_BOOTSTRAP_FN` | function | undeclared | Run by `ztr run-queue` before the first queued test
`ZTR_CLEAN_FN` | function | undeclared | Run by `ztr run-queue` after the last queued test
`ZTR_DEBUG` | integer | `0` | If non-zero, print debugging messages
`ZTR_EMULATION_MODE` | string | `zsh` | The emulation mode to use
`ZTR_QUIET` | integer | `0` | If non-zero, use quiet mode without passing `--quiet`
`ZTR_QUIET_EMULATION_MODE` | integer | `0` | If non-zero, use quiet emulation mode without passing `--quiet-emulate`
`ZTR_SETUP_ARGS` | string | undeclared | Passed to `ZTR_SETUP_FN`
`ZTR_SETUP_FN` | function | undeclared | Run by `ztr test` before the test expression is evaluated
`ZTR_TEARDOWN_ARGS` | string | undeclared | Passed to `ZTR_TEARDOWN_FN`
`ZTR_TEARDOWN_FN` | function | undeclared | Run by `ztr test` after the test expression is evaluated
