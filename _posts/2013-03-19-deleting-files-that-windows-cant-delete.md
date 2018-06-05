---
id: 124
title: Deleting files that Windows can’t delete
date: 2013-03-19T08:54:37+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=124
permalink-from-wordpress: /?p=124
categories:
  - Uncategorized
---
I recently downloaded some files from Salesforce Chatter which ended in &#8220;&#8230;.&#8221; 

If Windows won&#8217;t let you delete them (it says they don&#8217;t exist), SysInternals sdelete will: 

C:\tools\SysinternalsSuite\sdelete.exe /s &#8220;\\?\C:\Users\TRobinson\Desktop\Over the next few weeks&#8230;.&#8221;