---
title: Queue
head:
  - tag: title
    content: "Queue :: zsh-test-runner"
---

You can build up a queue of tests to run all at once.

`ztr queue <test>` adds `<test>` to the queue.

```shell
% x=2
% ztr queue '(( x == 2 ))'
% ztr queue '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
```

`ztr queue`, with no arguments, lists the queued tests.

<div data-next-codeblock-highlight-lines="4">

```shell
% x=2
% ztr queue '(( x == 2 ))'
% ztr queue '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
% ztr queue
ztr test '(( x == 2 ))'
ztr test '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
```

</div>

`ztr clear-queue` removes all tests from the queue.

<div data-next-codeblock-highlight-lines="7">

```shell
% x=2
% ztr queue '(( x == 2 ))'
% ztr queue '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
% ztr queue
ztr test '(( x == 2 ))'
ztr test '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
% ztr clear-queue
% ztr queue
%
```

</div>

`ztr run-queue` runs the queued tests.

<div data-next-codeblock-highlight-lines="15,16,17,18">

```shell
% x=2
% ztr queue '(( x == 2 ))'
% ztr queue '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
% ztr queue
ztr test '(( x == 2 ))'
ztr test '[[ $x == 1 ]]' '[[ $x == 1 ]]' 'Should fail'
% ztr clear-queue
% ztr queue # no output
% ztr queue '(( x > 2 ))' '(( x > 2 ))' 'Should fail'
% ztr queue '(( x == 2 ))'
% ztr queue
ztr test '(( x > 2 ))' '(( x > 2 ))' 'Should fail'
ztr test '(( x == 2 ))'
% ztr clear-summary
% ztr run-queue
FAIL (( x > 2 ))
    Should fail
PASS (( x == 2 ))
% ztr summary
2 tests total
1 (50%) failed
0 were skipped
1 (50%) passed
```

</div>
