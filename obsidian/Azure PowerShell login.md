---
title: Azure PowerShell login
---

```powershell
if ([string]::IsNullOrEmpty($(Get-AzureRmContext).Account)) {Login-AzureRmAccount}
```
