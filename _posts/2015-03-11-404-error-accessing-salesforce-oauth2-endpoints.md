---
id: 185
title: 404 error accessing Salesforce OAuth2 endpoints?
date: 2015-03-11T14:49:09+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=185
permalink-from-wordpress: /?p=185
categories:
  - Uncategorized
---
Try removing the trailing slash.

This works:

<https://login.salesforce.com/services/oauth2/token>

This doesn&#8217;t:

<https://login.salesforce.com/services/oauth2/token/>