---
title: "Rewriting git history - removing a directory"
date: "2016-01-12"
---

git filter-branch -force -index-filter &#8216;git rm -cached -r -ignore-unmatch directoryToRemove' -prune-empty &#8212; -all

git push origin master -force
