---
id: 16
title: Using SysInternals Process Monitor to troubleshoot permissions problems
date: 2007-07-10T21:37:20+00:00
author: Tom
layout: post
guid: http://blog.tjrobinson.net/?p=16
permalink: /?p=16
categories:
  - Uncategorized
---
I recently found a good use for [Process Monitor](http://www.microsoft.com/technet/sysinternals/utilities/processmonitor.mspx) which I hadn't thought of before: 

If you ever have problems with software not working and you suspect it may be a permissions issue, run Process Monitor while the software is running and look for any _ACCESS DENIED_ messages in the _Result_ column. It's much easier than guessing the permissions you need to set. 

Note: Process Monitor is an enhanced replacement for Filemon and Regmon but [Filemon](http://www.microsoft.com/technet/sysinternals/utilities/filemon.mspx) would still do the job.