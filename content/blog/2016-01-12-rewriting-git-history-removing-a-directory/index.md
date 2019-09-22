---
id: 220
title: 'Rewriting git history - removing a directory'
date: 2016-01-12T17:07:34+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
git filter-branch -force -index-filter &#8216;git rm -cached -r -ignore-unmatch directoryToRemove' -prune-empty &#8212; -all

git push origin master -force