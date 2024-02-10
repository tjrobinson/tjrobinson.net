---
title: Finding all NuGet packages across multiple solutions
date: "2013-08-02"
---

This PowerShell script will look for a file called nuget.config in the current directory, then use it to enumerate through all packages.config files across all solutions underneath the current directory and list the packages that are in use.

<https://gist.github.com/tjrobinson/6138411>
