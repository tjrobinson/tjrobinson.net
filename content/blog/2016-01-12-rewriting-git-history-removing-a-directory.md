---
date: "2016-01-12"
---
# Rewriting git history - removing a directory


git filter-branch -force -index-filter &#8216;git rm -cached -r -ignore-unmatch directoryToRemove' -prune-empty &#8212; -all

git push origin master -force
