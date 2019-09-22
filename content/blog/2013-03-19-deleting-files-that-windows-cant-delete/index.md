---
id: 124
title: Deleting files that Windows can’t delete
date: 2013-03-19T08:54:37+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
I recently downloaded some files from Salesforce Chatter which ended in "|." 

If Windows won't let you delete them (it says they don't exist), SysInternals sdelete will: 

C:\tools\SysinternalsSuite\sdelete.exe /s "\\?\C:\Users\TRobinson\Desktop\Over the next few weeks|."