---
title: Installation
head:
  - tag: title
    content: "Installation :: zsh-test-runner"
---

## Plugin (recommended)

Install zsh-test-runner with a zsh plugin manager. This is the recommended method because most modern plugin managers are optimized for shell load time performance and also install command-line completions for you.

The package to install is `olets/zsh-test-runner`, hosted on GitHub.

Each zsh plugin manager has its own way of doing things. See your package manager's documentation or the [zsh plugin manager plugin installation procedures gist](https://gist.github.com/olets/06009589d7887617e061481e22cf5a4a).

After adding the plugin to the manager, restart zsh:

```shell
exec zsh
```

## Package

zsh-test-runner is available on Homebrew. Run

```shell
brew install olets/tap/zsh-test-runner
```

and follow the post-install instructions logged to the terminal.

## Manual

Clone this repo and add `source path/to/ztr.zsh` to your `.zshrc` (replace `path/to/` with the correct path). Then restart zsh:

```shell
exec zsh
```
