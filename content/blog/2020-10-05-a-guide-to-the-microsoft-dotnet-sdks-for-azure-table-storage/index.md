---
title: A guide to the Microsoft .NET SDKs for Azure Table Storage
date: "2020-10-05"
---

_Last updated: October 2020_

There are a lot of nuget packages from Microsoft for use with Azure Table Storage. This is a short guide so that you can pick the right one.

# `WindowsAzure.Storage` (deprecated)

https://www.nuget.org/packages/WindowsAzure.Storage/

"NOTE: As of version 9.4.0, this library has been split into multiple parts and replaced. For table support, see Microsoft.Azure.CosmosDB.Table. This package has been deprecated."

# `Microsoft.Azure.CosmosDB.Table` (maintenance mode)

https://www.nuget.org/packages/Microsoft.Azure.CosmosDB.Table

"NOTE: This .NET Framework library is in maintenance mode and it will be deprecated soon. Please upgrade to the new .NET Standard library (Microsoft.Azure.Cosmos.Table) to continue to get the latest features supported."

# `Microsoft.Azure.Cosmos.Table` (current stable)

https://www.nuget.org/packages/Microsoft.Azure.Cosmos.Table

# `Azure.Data.Tables` (current beta)

https://www.nuget.org/packages/Azure.Data.Tables

Will replace: `Microsoft.Azure.Cosmos.Table`

See: https://github.com/Azure/azure-sdk-for-net/issues/6860
