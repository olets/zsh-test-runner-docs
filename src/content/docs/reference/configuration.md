---
title: Configuration
tableOfContents: false
head:
  - tag: title
    content: "Configuration :: zsh-test-runner"
---

:::tip
A new major version of zsh-test-runner is in the works. Learn about it now at  
https://next.zsh-test-runner.olets.dev
:::

Variable | Type | Default | Use
---|---|---|---
`NO_COLOR` | any | undeclared | To suppress color output, set to any value or simply declare (`NO_COLOR=`), for example in `.zshrc`. Recommended when [logging coverage reports to a file](/usage/logging).
`ZTR_DEBUG` | integer | `0` | If non-zero, print debugging messages
`ZTR_EMULATION_MODE` | string | `zsh` | The emulation mode to use
`ZTR_QUIET` | integer | `0` | If non-zero, use quiet mode without passing `--quiet`
`ZTR_QUIET_EMULATION_MODE` | integer | `0` | If non-zero, use quiet emulation mode without passing `--quiet-emulate`
`ZTR_SETUP_ARGS` | string | undeclared | Passed to `ZTR_SETUP_FN`
`ZTR_SETUP_FN` | function | undeclared | Run by `ztr test` before the test expression is evaluated
`ZTR_TEARDOWN_ARGS` | string | undeclared | Passed to `ZTR_TEARDOWN_FN`
`ZTR_TEARDOWN_FN` | function | undeclared | Run by `ztr test` after the test expression is evaluated
