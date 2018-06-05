---
id: 273
title: Setting all indexes to have zero replicas with Elasticsearch
date: 2017-04-05T14:34:48+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=273
permalink-from-wordpress: /?p=273
categories:
  - Uncategorized
---
To configure all indexes (including existing ones) to have zero replicas (useful if running on only one server, e.g. in development), execute this (syntax assumes you&#8217;re using Sense):

PUT /_settings
  
{
  
&#8220;index&#8221; : {
  
&#8220;number\_of\_replicas&#8221; : 0
  
}
  
}

Then check it&#8217;s worked by running this:

GET /_cat/indices?v