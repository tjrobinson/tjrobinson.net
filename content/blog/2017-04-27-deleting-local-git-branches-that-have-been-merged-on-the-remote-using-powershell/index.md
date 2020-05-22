---
title: Deleting local git branches that have been merged on the remote using PowerShell
date: "2017-04-27"
---

This is useful but hard to find a PowerShell version of. I found it [here](http://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged#comment56499683_6127884):

<pre>git branch --merged | %{$_.trim()} | ?{$_ -notmatch 'develop' -and $_ -notmatch 'master'} | %{git branch -d $_}</pre>
