---
title: Exported Variables
next: false
tableOfContents: false
head:
  - tag: title
    content: "Exported Variables :: zsh-test-runner"
---

Variable | Type | Default | Use
---|---|---|---
`ZTR_PATH` | string | Path to zsh-test-runner | Useful for passing to subshells. See [Logging results to a file](/usage/logging)
`ZTR_RESULTS` | associative array | `( [failed]=0 [passed]=0 [skipped]=0 )` | The running results

`ZTR_RESULTS[failed]` is a convenient way to check for 100% pass rate:

```shell
% (( ZTR_RESULTS[failed] )) || echo all tests pass
```
