---
title: A .gitignore file for excluding Rider (.idea) directories, except runConfigurations
date: "2019-04-28"
author: Tom Robinson
layout: post
---

This was suprisingly tricky to set up so I thought it would be good to share.

Added to a `.gitignore` file it will exclude JetBrains Rider (and IntelliJ?) `.idea` directories, except `runConfigurations`. I find it useful to have `runConfigurations` shared with my team, but not the other Rider metadata/configuration.

```
# Ignore only specific Rider files/directories
# For syntax see: https://stackoverflow.com/a/14422549/12124
/.idea/*
!/.idea/.idea.*
/.idea/.idea.*/*
!/.idea/.idea.*/.idea
/.idea/.idea.*/.idea/*
!/.idea/.idea.*/.idea/runConfigurations
```