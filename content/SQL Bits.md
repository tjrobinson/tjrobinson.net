---
tags:
  - conference
  - sql
  - sql-server
---
# SQL Bits 2023

Notes from the sessions I attended at SQL Bits 2023.

## Don't Let Your Permissions be Hijacked (Erland Sommarskog)

This covered an attack on SQL Server where somebody with `db_owner` on a database could elevate themselves to a sysadmin on the server by abusing the ability to create DDL triggers. In short, if you can create a trigger on a database, and then a sysadmin runs a maintenance job (e.g. updating indexes), your trigger will get run as them and can grant you sysadmin access. I think we're probably protected from this because of the way SQL Azure works, but I'll have a proper look through the slides and code at some point. It's a good lesson in why we want to follow least privilege.

Erland also explained how you can package permissions inside a stored procedure, so that users can perform privileged actions in a way you have control over. The article on how to do this is extremely long, but it's worth knowing about in case we ever need to allow an application (or manual workaround?) to have more permissions than it normally needs, wrapped up in a tamper-proof signed stored procedure.

## Securing Cosmos DB (Heini Ilmarinen)

A good refresher on Cosmos DB as it'd been a couple of years since I'd done anything with it.

- **Network security** - very similar to how blob storage is configured: VNETs, IP restrictions, private link. One complexity is that if you replicate Cosmos DB across the world, you need to set up the VNETs and private link for each region if you want it to work during regional unavailability.
- **Access control** - although there are Azure AD RBAC roles you can use, they're very coarse and only work at the account (resource) level. For fine-grained access to resources, like we have for SQL Server, you need to use Cosmos DB RBAC - another layer of access control that's Cosmos DB specific and lets you scope access to specific databases/containers. Terraform supports this, but there's currently no UI for it in the Azure Portal.

## SQL Server security features (Robert Hartskeerl)

Covered some of the built-in security features in recent SQL Server versions - dynamic data masking, row level security and encryption. Nothing particularly new, but a good reminder of how they work. Unfortunately most of the session was spent trying to make a point about it being possible to roll your own versions of these features in SQL Server 2000 - interesting but not very useful.

## Top Ten Terraform Trip Ups (Ben Somerville Roberts)

- Some interesting ideas around reducing the permissions needed by the [[Terraform]] runner, e.g. if the runner is the Owner of a resource group, it doesn't need to be an Owner of the entire subscription. If you plan it carefully you can split your Terraform into the parts that need highly privileged operations (creating resources) and those which need lower privileges for day-to-day operations (updating configuration of existing resources).
- Always use `data` resources to get hold of IDs for anything, e.g. identities - never hardcode GUIDs. This makes things less brittle.
- He recommended creating a pipeline for removing locks, which we already have - reassuring to know this is commonly done.

## GitHub Actions and database migrations

GitHub Actions is similar to [[Azure DevOps]] pipelines. The feeling is that GitHub Actions is the future and where Microsoft is putting more effort, but currently they offer pretty much the same functionality. The theme of the session was database migrations, so it covered Dacpac deployments (you can use the newer SDK project type now) and DbUp (a tool for migrations). There was a bit on the GitHub Actions bot which was interesting but not currently useful for us.

Credscan popped up during this session - a tool developed and maintained by Microsoft to identify credential leaks, such as those in source code and configuration files. Worth a look, along with similar tools - see [[Secret Management]].

## Shorter sessions

A couple of shorter sessions on persuasive communication and managing your time: use of the Pomodoro technique, planning your day properly, removing distractions, etc.

## JetBrains Rider

I had a demo of JetBrains Rider (which some of us use already) and it has really nice SQL integration, including code completion and refactoring. I'll give it a go and see how I get on.

## See also

- [[SQL Server]]
- [[Security Conferences]]
