---
title: msysgit conflict with Subversion
date: "2012-05-17"
---
I’ve got msysgit installed, with the bin directory in my PATH.

Unfortunately msysgit uses svn 1.4.6 still, so when I was running svn on the command line it was finding the older msysgit version first, not the newer version that’s part of TortoiseSVN.

There’s a WontFix bug on the msysgit tracker: <http://code.google.com/p/msysgit/issues/detail?id=253>

Shuffling the order of the PATHs has solved the problem for now.