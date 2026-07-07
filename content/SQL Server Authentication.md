---
tags:
  - sql-server
---
# SQL Server Authentication

There are three main types of authentication:

- SQL Server Authentication
- Windows Authentication
- Microsoft Entra ID (formerly Azure Active Directory)

## Standard SQL Server

### SQL Server Authentication

```sql
-- Create user with SQL Authentication
CREATE LOGIN DuaneDibbley WITH PASSWORD = '<StrongPasswordHere>';

-- At this point the user can log in, but can't see any databases

-- Switch to a database
USE TestDB;

-- Create the user in that database - the user name can be different to the login
CREATE USER DuaneDibbley FOR LOGIN DuaneDibbley;

-- Assign roles to the user at the database level
EXEC sp_addrolemember 'db_datareader', 'DuaneDibbley'
EXEC sp_addrolemember 'db_datawriter', 'DuaneDibbley'
```

## SQL Azure

### SQL Server Authentication

```sql
-- Switch to master to create logins
USE master;

-- Create user with SQL Authentication
CREATE LOGIN DuaneDibbley WITH PASSWORD = '<StrongPasswordHere>';

-- At this point the user can log in, but can't see any databases

-- Switch to a database
USE TestDB;

-- Assign roles
EXEC sp_addrolemember 'db_datareader', 'DuaneDibbley'
EXEC sp_addrolemember 'db_datawriter', 'DuaneDibbley'
```

### Microsoft Entra ID Authentication

```sql
-- Switch to a database
USE TestDB;

-- Create the user in the database - no need to create a login first
CREATE USER [someone@mydomain.com] FROM EXTERNAL PROVIDER;

-- Assign roles
EXEC sp_addrolemember 'db_datareader', 'someone@mydomain.com'
EXEC sp_addrolemember 'db_datawriter', 'someone@mydomain.com'
```

## See also

- [[SQL Server]]
- [[Microsoft Entra ID]]
