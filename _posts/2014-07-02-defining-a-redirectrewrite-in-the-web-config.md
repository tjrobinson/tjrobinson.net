---
id: 157
title: Defining a redirect/rewrite in the Web.config
date: 2014-07-02T13:57:53+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
For my own reference:

<noscript>
  <pre><code class="language-xml xml">&lt;?xml version="1.0"?&gt;
&lt;configuration&gt;
  &lt;system.webServer&gt;
    &lt;rewrite&gt;
      &lt;rules&gt;
        &lt;rule name="Index Request" enabled="true" stopProcessing="true"&gt;
          &lt;match url="^$"/&gt;
          &lt;action type="Rewrite" url="App/app.html" logRewrittenUrl="true"/&gt;
        &lt;/rule&gt;
      &lt;/rules&gt;
    &lt;/rewrite&gt;
  &lt;/system.webServer&gt;
&lt;/configuration&gt;</code></pre>
</noscript>