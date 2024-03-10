- [AT TIME ZONE (Transact-SQL) - SQL Server | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/queries/at-time-zone-transact-sql?view=sql-server-ver16)
 - [The SQL Diagnostic (jupyter) Book - T-SQL Tech](https://tsql.tech/the-sql-diagnostic-jupyter-book/)
 - [[SQL Server Authentication]]

Getting the full data out of an NVARCHAR(MAX) column in SQL Server Management Studio:

```sql
SELECT CAST('<deleteme><![CDATA[' + CAST(LargeColumn as nvarchar(max)) + ']]></deleteme>' AS xml) FROM MyTable
```
