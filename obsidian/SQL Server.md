- [AT TIME ZONE (Transact-SQL) - SQL Server | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/queries/at-time-zone-transact-sql?view=sql-server-ver16)
 - [The SQL Diagnostic (jupyter) Book - T-SQL Tech](https://tsql.tech/the-sql-diagnostic-jupyter-book/)
 - [[SQL Server Authentication]]
 - [https://www.red-gate.com/simple-talk/sql/t-sql-programming/modeling-time/](https://www.red-gate.com/simple-talk/sql/t-sql-programming/modeling-time/)
 - [SOUNDEX](https://docs.microsoft.com/en-us/sql/t-sql/functions/soundex-transact-sql?view=sql-server-ver15) and [DIFFERENCE](https://docs.microsoft.com/en-us/sql/t-sql/functions/difference-transact-sql?view=sql-server-ver15) - "SOUNDEX converts an alphanumeric string to a four-character code that is based on how the string sounds when spoken."
 - [SQL Formatter](https://www.red-gate.com/website/sql-formatter)

Getting the full data out of an NVARCHAR(MAX) column in SQL Server Management Studio:

```sql
SELECT CAST('<deleteme><![CDATA[' + CAST(LargeColumn as nvarchar(max)) + ']]></deleteme>' AS xml) FROM MyTable
```
