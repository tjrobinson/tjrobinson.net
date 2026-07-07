---
tags:
  - git
---
# Git

- [[Git hook for blocking specific files being committed]]

## Useful commands

Deleting local git branches that have been merged on the remote, using PowerShell:

```powershell
git branch --merged | %{$_.trim()} | ?{$_ -notmatch 'develop' -and $_ -notmatch 'master'} | %{git branch -d $_}
```

Forcing a change without making any actual changes, e.g. to re-trigger a GitHub workflow:

```shell
git commit -m 'Empty change' --allow-empty && git push
```

## `git unfuck`

Resets your branch to the state of your remote tracking branch:

```shell
git config --global alias.unfuck 'reset --hard @{upstream}'
```

```shell
git unfuck
```

## Blog posts

- [[2012-05-17-msysgit-conflict-with-subversion|msysgit conflict with Subversion]]
- [[2016-01-12-rewriting-git-history-removing-a-directory|Rewriting git history - removing a directory]]
- [[2019-04-28-a-gitignore-file-for-excluding-rider-idea-directories-except-runconfigurations|A .gitignore file for excluding Rider (.idea) directories, except runConfigurations]]
