---
title: Exported Variables
tableOfContents: false
head:
  - tag: title
    content: "Exported Variables :: zsh-test-runner"
---

:::tip
A new major version of zsh-test-runner is in the works. Learn about it now at  
https://next.zsh-test-runner.olets.dev
:::

Variable | Type | Default | Use
---|---|---|---
`ZTR_PATH` | string | Path to zsh-test-runner | Useful for passing to subshells. See [Logging results to a file](/usage/logging)
`ZTR_RESULTS` | associative array | `( [failed]=0 [passed]=0 [skipped]=0 )` | The running results

`ZTR_RESULTS[failed]` is a convenient way to check for 100% pass rate:

```shell
% (( ZTR_RESULTS[failed] )) || echo all tests pass
```
