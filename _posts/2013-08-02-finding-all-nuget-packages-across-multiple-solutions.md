---
id: 128
title: Finding all NuGet packages across multiple solutions
date: 2013-08-02T09:57:17+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
This PowerShell script will look for a file called nuget.config in the current directory, then use it to enumerate through all packages.config files across all solutions underneath the current directory and list the packages that are in use.

<https://gist.github.com/tjrobinson/6138411>