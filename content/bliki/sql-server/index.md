---
title: SQL Server Odds & Ends
---

Getting the full data out of an NVARCHAR(MAX) column in SQL Server Management Studio:

```sql
SELECT CAST('<deleteme><![CDATA[' + CAST(LargeColumn as nvarchar(max)) + ']]></deleteme>' AS xml) FROM MyTable
```
