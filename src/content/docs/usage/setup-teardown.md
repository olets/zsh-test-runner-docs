---
title: Setup & Teardown
head:
  - tag: title
    content: "Setup & Teardown :: zsh-test-runner"
---

zsh-test-runner can automatically run a "setup" function before every test, and a "teardown" function after every test.

## Setup

zsh-test-runner can automatically run a "setup" function before every test. Simply define `ZTR_SETUP_FN`.

This is useful for scaffolding.

```shell
% ZTR_SETUP_FN() {
  echo setting up
}
% ztr test '(( 1 == 1 ))'
setting up
# test ran here
PASS (( 1 == 1 ))
```

You can pass arguments to the setup function by defining `ZTR_SETUP_ARGS`.

```shell
% ZTR_SETUP_FN() {
  # argv is ZTR_SETUP_ARGS
  echo setting up $2
}
% x=2
% y=3
% ZTR_SETUP_ARGS=( $x $y )
% ztr test "(( $x < $y ))"
setting up 3
# test ran here
PASS (( 2 < 3 ))
```

## Teardown

zsh-test-runner can automatically run a "teardown" function after every test. Simply define `ZTR_TEARDOWN_FN`.

This is useful for removing artifacts and undoing side effects.

```shell
% ZTR_TEARDOWN_FN() {
  echo tearing down
}
% ztr test '(( 1 == 1 ))'
# test ran here
tearing down
PASS (( 1 == 1 ))
```

You can pass arguments to the setup function by defining `ZTR_TEARDOWN_ARGS`.

```shell
% ZTR_TEARDOWN_FN() {
  # argv is ZTR_TEARDOWN_ARGS
  echo setting up $2
}
% x=2
% y=3
% ZTR_TEARDOWN_ARGS=( $x $y )
% ztr test "(( $x < $y ))"
# test ran here
setting up 3
PASS (( 2 < 3 ))
```
