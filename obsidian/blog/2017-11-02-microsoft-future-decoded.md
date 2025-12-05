---
date: "2017-11-02"
---

# Microsoft Future Decoded, November 1st 2017, Day 2: Tech Deep Dives

These are my notes from the day. It's not a detailed summary of the event, just notes for things I found interesting or want to remember to try out or do.

## Expo

Not much that was relevant to us. Mostly vendors helping people migrate to the cloud.

## Innvovation Keynote

Focused on Mixed Reality, DNA storage, blockchain in Azure. All very interesting but nothing immediately actionable.

## [CosmosDB - Global Scale, Multi-Model, Guaranteed Latency](https://www.futuredecoded.com/session/9b406559-e9a8-e711-80c2-000d3a2269dd)

- We should add some validation onto all the entities we store in CosmosDB that runs before we save/update. Probably using FluentValidation. This should include anything used to generate the `ID` or the `PartitionKey`, e.g. `OrganisationIdentifier`.
- When we go live, start by over-provisioning RUs and then once we can see our usage through the portal, dial it down.
- Find out more about the different consistency levels as there could be performance benefits, particularly when importing data. This is configurable per-request.
- Think about how we want to configure indexing - lazy?
- We can use Azure Functions with CosmosDB triggers to trigger copying of data to SQL Server
- [Endjin Cloud Adoption Risk Model](https://endjin.com/thought-leadership/cloud-adoption-risk-model) poster
- The `IndexingPolicy` is configurable, we need to work out what we need
- Even if we're not partitioning to begin with, we need to set a `PartitionKey` and make sure it's a good one
- Although the SDK will handle and retry errors, e.g. `429` - we need to decide what to do if this still fails. Endjin use a dead letter queue.
- We could provide a UI for editing RU configuration without needing to re-deploy - though the Azure Portal should be able to handle most requirements for this
- Look into per minute request units configuration to give some flexibility for bursty traffic
- Cross partition queries are expensive so avoid using them where possible
- Sign up for <http://azureweekly.info/> a summary of the week's top news in the Microsoft Azure ecosystem, as well as interesting historic content that's well worth reading.
- Since we're migrating from RavenDB, check for gaps in CosmosDB tooling, e.g. how easy is it to manually edit a single document?
- Once you select the API for accessing CosmosDB you can't then use a different API. For example you can't mix the table storage API with DocumentDB API.
- Check the current document size limit and make sure none of the data we're migrating is approaching it
- Make sure we're logging the RUs used by all requests. See: [Cosmos DB Request Units and the .NET SDK](http://odetocode.com/blogs/scott/archive/2017/10/31/cosmos-db-request-units-and-the-net-sdk.aspx)

## [DevOps: Zero to Hero with Visual Studio Team Services](https://www.futuredecoded.com/session/f0525520-eea8-e711-80c2-000d3a2269dd)

- Look at how to use the VSTS Release feature alongside Gitflow/Hubflow. There must be some documentation on it.
- PowerBI can be hooked up to VSTS so you can generate dashboards and reports from VSTS activity. This could be a good way of getting an overview of all builds/releases. See: <https://docs.microsoft.com/en-us/vsts/report/powerbi/>

## [Microsoft SQL - What you need to know for Privacy, Compliance and GDPR](https://www.futuredecoded.com/session/dae9992a-e4a8-e711-80c2-000d3a2269dd)

- Find about the Microsoft Assessment and Planning Toolkit (not relevant to us as designed for cloud migrations)
- A classification, e.g. "address", "name", "email" can be assigned to columns in SQL Server to make it easier to identify personal data
- Some example code used the `FORMSOF` function - could be useful one day. See: [Querying SQL Server Using Full-Text Search](<https://technet.microsoft.com/en-us/library/ms142559(v=sql.105).aspx>)
- Try out [SQL Server Vulnerability Assessment Tools](https://azure.microsoft.com/en-us/blog/introducing-sql-vulnerability-assessment-for-azure-sql-database-and-on-premises-sql-server/)
- There was an interesting demo of temporal tables showing how it can be used to a) expire data after a specified date b) restore data to a previous version (without doing a full database restore). See: [Temporal Tables](https://docs.microsoft.com/en-us/sql/relational-databases/tables/temporal-tables) Temporal tables
- It was implied that it's okay to keep backups containing data of individuals that have asked to have their data deleted so long as you also keep a list of these individuals and make sure that after restoring any backups, there's a process to run through this list and re-delete the data of those individuals.

## [Empowering Keynote](https://www.futuredecoded.com/session/0a8714ff-3199-e711-80c2-000d3a2103ab)

I didn't stay for this but the video is available online.
