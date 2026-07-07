---
title: Rewriting git history - removing a directory
date: 2016-01-12
tags:
  - git
---

# Rewriting git history - removing a directory

```shell
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch directoryToRemove' --prune-empty -- --all
```

```shell
git push origin master --force
```

Note: these days [git filter-repo](https://github.com/newren/git-filter-repo) is the recommended tool for this job.
