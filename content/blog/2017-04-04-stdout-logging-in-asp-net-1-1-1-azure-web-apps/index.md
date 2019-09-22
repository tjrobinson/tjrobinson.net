---
id: 268
title: Stdout logging in ASP.NET 1.1.1 Azure Web Apps
date: 2017-04-04T10:25:54+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
Because I keep forgetting it:

<pre>stdoutLogEnabled="true"
 stdoutLogFile="\\?\%home%\LogFiles\stdout"</pre>
 
 Full details: https://github.com/aspnet/Docs/blob/master/aspnetcore/host-and-deploy/azure-apps/troubleshoot.md#run-the-app-in-the-kudu-console
