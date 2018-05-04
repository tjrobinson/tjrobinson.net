---
id: 81
title: msysgit conflict with Subversion
date: 2012-05-17T07:52:37+00:00
author: Tom
layout: post
guid: http://tjrobinson.wordpress.com/?p=81
permalink: /?p=81
jabber_published:
  - "1337241158"
categories:
  - Uncategorized
---
I’ve got msysgit installed, with the bin directory in my PATH.

Unfortunately msysgit uses svn 1.4.6 still, so when I was running svn on the command line it was finding the older msysgit version first, not the newer version that’s part of TortoiseSVN.

There’s a WontFix bug on the msysgit tracker: <http://code.google.com/p/msysgit/issues/detail?id=253>

Shuffling the order of the PATHs has solved the problem for now.