---
id: 220
title: 'Rewriting git history &#8211; removing a directory'
date: 2016-01-12T17:07:34+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=220
permalink-from-wordpress: /?p=220
categories:
  - Uncategorized
---
git filter-branch &#8211;force &#8211;index-filter &#8216;git rm &#8211;cached -r &#8211;ignore-unmatch directoryToRemove&#8217; &#8211;prune-empty &#8212; &#8211;all

git push origin master &#8211;force