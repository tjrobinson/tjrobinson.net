---
id: 22
title: Filter for WinMerge
date: 2007-07-12T07:00:15+00:00
author: Tom Robinson
layout: post
categories:
  - Programming
  - Software
  - Technology
tags:
  - Dreamweaver
  - FrontPage
  - WinMerge
---
A lot of web development tools like [Dreamweaver](http://kb.adobe.com/selfservice/viewContent.do?externalId=tn_15237&sliceId=1) and [FrontPage](http://www.microsoft.com/technet/community/chats/trans/frontpage/fp1022.mspx) like to create annoying files and folders throughout a build. I'm sure they're useful to somebody, but they just get in the way when you're doing a comparison of two builds.

I thought I'd share a basic [filter](http://winmerge.org/2.4/manual/filters.html) I've made for [WinMerge](http://winmerge.org/), which makes it ignore any junk files created by Dreamweaver, FrontPage and Windows.

**Folders ignored:
  
** 

  * \_vti\_cnf
  * _notes

**Files ignored:
  
** 

  * Thumbs.db
  * \_vti\_cnf
  * dwsync.xml

I'll probably add more files to this list as I discover them, but for now please feel free to [download the filter](/content/ignore-junk/IgnoreJunk-1.0.zip). If you have any suggestions, please add a comment to this post.