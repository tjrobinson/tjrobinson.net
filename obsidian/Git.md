Deleting local git branches that have been merged on the remote using PowerShell:

```
git branch --merged | %{$_.trim()} | ?{$_ -notmatch 'develop' -and $_ -notmatch 'master'} | %{git branch -d $_}
```