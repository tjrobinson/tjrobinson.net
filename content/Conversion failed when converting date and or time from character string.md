---
tags:
  - sql-server
---
# Conversion failed when converting date and/or time from character string

```sql
SELECT COUNT(*)
FROM [vwTasks] AS [item]
WHERE ((([item].[Deadline] < '2019-04-15T00:00:00.0000000')
```

> Conversion failed when converting date and/or time from character string

This can happen when Entity Framework Core generates `datetime2`-style literals for a column that is `datetime`.

- [EF Core 2.0: default all date fields to use datetime2 — Stack Overflow](https://stackoverflow.com/questions/44393108/efcore-2-0-default-all-date-fields-to-use-datetime2)
- [Data types — EF Core relational modelling docs](https://docs.microsoft.com/en-us/ef/core/modeling/relational/data-types)

## See also

- [[SQL Server]]
