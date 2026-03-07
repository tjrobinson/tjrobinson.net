# SQL Server Authentication

There are two main types of authentication:

- SQL Server Authentication
- Windows Authentication
- Azure Active Directory

## Standard SQL Server

### SQL Server Authentication

```sql
-- Create user with SQL Authentication
CREATE LOGIN DuaneDibbley WITH PASSWORD = 'rpZ9YRMkU&T8j&#h';

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
CREATE LOGIN DuaneDibbley WITH PASSWORD = 'rpZ9YRMkU&T8j&#h';

-- At this point the user can log in, but can't see any databases

-- Switch to a database
USE TestDB;

-- Assign roles
EXEC sp_addrolemember 'db_datareader', 'DuaneDibbley'
EXEC sp_addrolemember 'db_datawriter', 'DuaneDibbley'


USE TestDB;
CREATE USER [tom.robinson@clear.bank] FROM EXTERNAL PROVIDER;
EXEC sp_addrolemember 'db_datareader', 'DuaneDibbley'
EXEC sp_addrolemember 'db_datawriter', 'DuaneDibbley'
```

### Azure Active Directory Authentication

```sql
-- Switch to a database
USE TestDB;

-- Create the user in the database - no need to create a login first
CREATE USER [someone@mydomain.com] FROM EXTERNAL PROVIDER;

-- Assign roles
EXEC sp_addrolemember 'db_datareader', 'DuaneDibbley'
EXEC sp_addrolemember 'db_datawriter', 'DuaneDibbley'
```
