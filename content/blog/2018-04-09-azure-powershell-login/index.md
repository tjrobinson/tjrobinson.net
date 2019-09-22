---
title: Azure PowerShell login
date: "2018-04-09"
---
```powershell
if ([string]::IsNullOrEmpty($(Get-AzureRmContext).Account)) {Login-AzureRmAccount}
```