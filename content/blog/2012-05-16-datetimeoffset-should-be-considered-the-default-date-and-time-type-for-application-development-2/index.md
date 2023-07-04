---
title: "DateTimeOffset should be considered the default date and time type for application development"
date: "2012-05-16"
---

If you’re in the habit (like I was until recently) of using the [DateTime](http://msdn.microsoft.com/en-us/library/system.datetime.aspx) data type whenever you need to represent a date, time or timestamp then I strongly recommend reading this MSDN article:

[Choosing Between DateTime, DateTimeOffset, and TimeZoneInfo](http://msdn.microsoft.com/en-us/library/bb630289.aspx)

The main points are:

- Only if a [DateTime](http://msdn.microsoft.com/en-us/library/system.datetime.aspx) value represents UTC does that value unambiguously identify a single point in time regardless of the system or time zone in which the value is used.
  - The [DateTimeOffset](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) structure represents a date and time value, together with an offset that indicates how much that value differs from UTC. Thus, the value always unambiguously identifies a single point in time.
    - The [DateTimeOffset](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) type can be used to unambiguously define the meaning of "now", to log transaction times, to log the times of system or application events, and to record file creation and modification times.
      - These uses for [DateTimeOffset](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) values are much more common than those for [DateTime](http://msdn.microsoft.com/en-us/library/system.datetime.aspx) values. As a result, [DateTimeOffset](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) should be considered the default date and time type for application development. </ul>
        It’s worth also mentioning that recent versions of SQL Server support an equivalent type, so you can easily persist this type in databases without any conversion: [datetimeoffset](http://msdn.microsoft.com/en-us/library/bb630289.aspx)
