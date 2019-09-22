---
title: Untitled
date: "2019-04-28"
author: Tom Robinson
layout: post
---

```sql
SELECT COUNT(*)
FROM [vwTasks] AS [item]
WHERE ((([item].[Deadline] < '2019-04-15T00:00:00.0000000')
```

> Conversion failed when converting date and/or time from character string

https://stackoverflow.com/questions/44393108/efcore-2-0-default-all-date-fields-to-use-datetime2

https://docs.microsoft.com/en-us/ef/core/modeling/relational/data-types