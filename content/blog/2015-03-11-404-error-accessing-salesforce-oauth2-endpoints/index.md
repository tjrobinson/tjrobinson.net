---
title: 404 error accessing Salesforce OAuth2 endpoints?
date: "2015-03-11"
---

Try removing the trailing slash.

This works:

<https://login.salesforce.com/services/oauth2/token>

This doesn't:

<https://login.salesforce.com/services/oauth2/token/>
