---
title: Setting all indexes to have zero replicas with Elasticsearch
date: "2017-04-05"
---
To configure all indexes (including existing ones) to have zero replicas (useful if running on only one server, e.g. in development), execute this (syntax assumes you're using Sense):

PUT /_settings
  
{
  
"index" : {
  
"number\_of\_replicas" : 0
  
}
  
}

Then check it's worked by running this:

GET /_cat/indices?v