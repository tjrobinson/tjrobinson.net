# Git

Deleting local git branches that have been merged on the remote using PowerShell:

```
git branch --merged | %{$_.trim()} | ?{$_ -notmatch 'develop' -and $_ -notmatch 'master'} | %{git branch -d $_}
```

Forcing a change without making any actual changes, e.g. to re-trigger a GitHub workflow:

```
git commit -m 'Empty change' --allow-empty && git push
```
