# SQL Server

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

Script to get database permissions for a user:

```sql
-- check all permissions of identity
DECLARE @User NVARCHAR(200) = 'user.name@example.com'

SELECT -- DB roles
    '' AS schema_name, DP1.name AS resource_name, 'ROLE' as class_desc,
    '' as permission_name, '' as permission_state_desc, isnull (DP2.name, 'No members') AS principal_name
FROM sys.database_role_members AS DRM  
RIGHT OUTER JOIN sys.database_principals AS DP1 ON DRM.role_principal_id = DP1.principal_id  
LEFT OUTER JOIN sys.database_principals AS DP2 ON DRM.member_principal_id = DP2.principal_id  
WHERE DP1.type = 'R' and DP2.name like concat('%', @User, '%')
UNION ALL
SELECT -- execute (db and objects)
    object_schema_name(dbperm.major_id) as schema_name, object_name(dbperm.major_id) as resource_name,
    dbperm.class_desc, dbperm.permission_name, dbperm.state_desc, dbprin.name as principal_name
FROM sys.database_principals dbprin
LEFT JOIN sys.database_permissions dbperm ON dbperm.grantee_principal_id = dbprin.principal_id
LEFT JOIN sys.schemas dbsch ON dbsch.schema_id = dbperm.major_id
WHERE dbprin.name like concat('%', @User, '%') and dbperm.permission_name in ('CONNECT', 'EXECUTE') and dbperm.class_desc in ('DATABASE', 'OBJECT_OR_COLUMN')
UNION ALL
SELECT -- execute (schema)
    dbsch.name as schema_name, '' as resource_name, dbperm.class_desc, dbperm.permission_name,
    dbperm.state_desc, dbprin.name as principal_name
FROM sys.database_principals dbprin
LEFT JOIN sys.database_permissions dbperm ON dbperm.grantee_principal_id = dbprin.principal_id
LEFT JOIN sys.schemas dbsch ON dbsch.schema_id = dbperm.major_id
WHERE dbprin.name like concat('%', @User, '%') and dbperm.permission_name  = 'EXECUTE' and dbperm.class_desc in ('SCHEMA')
UNION ALL
SELECT -- execute (type)
    s.name as schema_name, t.name as resource_name, dbperm.class_desc, dbperm.permission_name,
    dbperm.state_desc, dbprin.name as principal_name
FROM sys.database_principals dbprin
LEFT JOIN sys.database_permissions dbperm
ON dbperm.grantee_principal_id = dbprin.principal_id
INNER JOIN sys.types AS t ON dbperm.major_id = t.user_type_id
INNER JOIN sys.schemas AS s ON t.[schema_id] = s.[schema_id]
WHERE dbprin.name like concat('%', @User, '%') AND dbperm.permission_name = 'EXECUTE' AND dbperm.class_desc = 'TYPE'
UNION ALL
SELECT -- other permissions
    object_schema_name(dbperm.major_id) as schema_name, object_name(dbperm.major_id) as resource_name,
    dbperm.class_desc, dbperm.permission_name, dbperm.state_desc, dbprin.name as principal_name
FROM sys.database_principals dbprin
INNER JOIN sys.database_permissions dbperm ON dbperm.grantee_principal_id = dbprin.principal_id
WHERE dbprin.name like concat('%', @User, '%') AND dbperm.permission_name not in ('EXECUTE', 'CONNECT')
order by principal_name
```
