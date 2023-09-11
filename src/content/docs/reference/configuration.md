---
title: Configuration
tableOfContents: false
head:
  - tag: title
    content: "Configuration :: zsh-test-runner"
---

Variable | Type | Default | Use
---|---|---|---
`NO_COLOR` | any | undeclared | To suppress color output, set to any value or simply declare (`NO_COLOR=`), for example in `.zshrc`.<br>See [Running test suites](#running-test-suites) for other uses, and <https://no-color.org/> for more info.
`ZTR_DEBUG` | integer | `0` | If non-zero, print debugging messages
`ZTR_EMULATION_MODE` | string | `zsh` | The emulation mode to use
`ZTR_QUIET` | integer | `0` | If non-zero, use quiet mode without passing `--quiet`
`ZTR_QUIET_EMULATION_MODE` | integer | `0` | If non-zero, use quiet emulation mode without passing `--quiet-emulate`
