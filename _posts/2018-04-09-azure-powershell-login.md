---
id: 289
title: Azure PowerShell login
date: 2018-04-09T17:10:54+00:00
author: Tom
layout: post
categories:
  - Uncategorized
---
if ([string]::IsNullOrEmpty($(Get-AzureRmContext).Account)) {Login-AzureRmAccount}