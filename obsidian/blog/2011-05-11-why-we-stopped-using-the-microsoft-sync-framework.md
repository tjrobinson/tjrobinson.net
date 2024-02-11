---
title: Why we stopped using the Microsoft Sync Framework
date: "2011-05-11"
---

Somebody on Stack Overflow [recently asked](http://stackoverflow.com/questions/5965404/sync-2-net-applications/) for reasons why I wouldn't reccommend using the [Microsoft Sync Framework](http://msdn.microsoft.com/en-us/sync/bb736753). Below is some feedback which I sent to the Sync Framework team at Microsoft which covers this fairly well and may be useful to other people considering using the Sync Framework in non-database projects.

<!--more-->

We originally chose the Sync Framework as we were looking for something to produce a quick prototype of a tool which allowed file synchronisation from a Windows filesystem to Windows Azure Blob Storage. We found an example provider for Azure and we used this (and modified it) along with the FileSyncProvider to achieve our goal. It had been working okay in basic situations and was fine for the prototype but as the prototype developed into a beta release of the product we were finding it getting in the way of progress, primarily because when strange behaviour occurred it was very difficult to understand what the Sync Framework was doing under the covers – debugging was very difficult. We came across the problem which this case refers to and realised that we had come as far as we could with the Sync Framework, due to changes in the original requirements from our product owner. The original benefit of using the Sync Framework (quicker to get started) was being outweighed by the restrictions it placed on what we were trying to do. Our requirement changes meant that our synchronisation scenario was much simpler than originally thought and we decided that we no longer needed to use the Sync Framework.

The things that we found challenging about the Sync Framework:

- [Confusion in blog posts and articles over SQL Server synchronisation vs. file synchronisation – it seems that most focus on SQL Server synchronisation and “forget” about file synchronisation](http://social.microsoft.com/Forums/en-US/syncdevdiscussions/thread/3686f3ba-e326-4676-96c2-e83ea32ffc1d)
- [Lack of source code and the Sync Framework core being unmanaged code – this made debugging difficult and we often found ourselves guessing why the Sync Framework had attempted to insert/update a particular file](http://social.microsoft.com/Forums/en-US/syncdevdiscussions/thread/4116c9ff-17f6-475c-b21a-35dcbd643504)
- ItemFieldDictionary – this is not a fun class to work with! Flexibility vs. readability
- [Confusion on the forums about a mysterious “metdataFSP.Harmonica” file](http://social.microsoft.com/Forums/en-US/syncdevdiscussions/thread/0d61c8e5-4b02-4dde-a181-20a866e4393c)
- [Internal classes without constructors made unit testing difficult](http://stackoverflow.com/questions/3279412/mocking-a-type-with-an-internal-constructor-using-moq)
- [Lack of control over the order of synchronisation of items](http://social.microsoft.com/Forums/en-US/syncdevdiscussions/thread/0526f0a6-fcff-4a6b-bb50-f4213f26239f)
- [Lack of documentation of the metadata stores and schema – in an ideal world we wouldn’t need to know about this, but we found that examining the metadata stores was the only way to diagnose some problems](http://social.microsoft.com/Forums/en-US/syncdevdiscussions/thread/4116c9ff-17f6-475c-b21a-35dcbd643504)

I’m sure there are solutions to most of the above but I think the general feel among my team was that the Sync Framework was perhaps too powerful/complex for our needs and that a custom solution developed internally would give us the flexibility we needed.
