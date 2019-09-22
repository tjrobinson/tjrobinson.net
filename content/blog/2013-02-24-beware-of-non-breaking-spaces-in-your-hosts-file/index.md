---
title: Beware of non-breaking spaces in your HOSTS file
date: 2013-02-24T12:53:26+00:00
---
I recently had some problems with HOSTS file entries that were being ignored. When viewed in most text editors it looked correct, but what looked like harmless whitespace was actually a [non-breaking space](http://en.wikipedia.org/wiki/Non-breaking_space) (Decimal 160 or Hex A0). Although you can use tabs or spaces to separate the IP address from the hostname in HOSTS file, it treats non-breaking spaces as part of the hostname and therefore doesn’t work as expected.