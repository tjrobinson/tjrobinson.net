---
title: Untitled
date: "2019-04-28"
author: Tom Robinson
layout: post
---

```
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
Get-Module AzureRM -ListAvailable
Uninstall-Module AzureRM
Get-Module AzureRM -ListAvailable
```

Wait until there are none left.

```powershell
Install-Module -Name AzureRM
```