---
title: Exported Variables
head:
  - tag: title
    content: "Exported Variables :: zsh-test-runner"
---

## Results

Variable | Type | Default | Use
---|---|---|---
`ZTR_RESULTS` | associative array | `( [failed]=0 [passed]=0 [skipped]=0 )` | The running results

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

```shell
% (( ZTR_RESULTS[failed] )) || echo all tests pass
```

## Other

Variable | Type | Use
---|---|---
`ZTR_PATH` | string | `source $ZTR_PATH` in scripts that include `ztr` commands |