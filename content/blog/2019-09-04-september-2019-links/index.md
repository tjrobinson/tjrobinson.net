---
title: September 2019 Links
date: "2019-09-04"
author: Tom Robinson
layout: post
---

A collection of interesting things I've discovered this month:

- [json:api](https://jsonapi.org/format/) - This is an interesting way of structuring the JSON responses from your REST API. I've not come across it before but seems worth being aware of.
- [Advanced StructureMap: connecting implementations to open generic types](https://lostechies.com/jimmybogard/2009/12/18/advanced-structuremap-connecting-implementations-to-open-generic-types/) - A good article for describing what `ConnectImplementationsToTypesClosing()` does.
- [NJsonSchema for .NET](https://github.com/RicoSuter/NJsonSchema) - A free alternative to [Json.NET Schema](https://www.newtonsoft.com/jsonschema) which seems to work pretty well.
- [Awesome Console](https://plugins.jetbrains.com/plugin/7677-awesome-console) - JetBrains Rider plugin for making URLs/paths in console output into hyperlinks.
- [Aggressively tuning Cosmos DB (the long way round)](http://blog.tdwright.co.uk/2019/06/29/aggressively-tuning-cosmos-db-the-long-way-round/)
- [Solution-wide Nuget package version handling with MsBuild 15+](https://www.strathweb.com/2018/07/solution-wide-nuget-package-version-handling-with-msbuild-15/) - You can use a `Directory.Build.targets` file to pin package versions at the solution level. You can even specify a range, for example `<PackageReference Update="AutoMapper" Version="[9.0.0,10.0)" />` means greater than or equal to `9.0.0` and less than `10.0`. Here's a full example from IdentityServer4: [Directory.Build.targets](https://github.com/IdentityServer/IdentityServer4/blob/f3049a11bfc23fc5c2e0cf61749ee4ecd058f30a/src/Directory.Build.targets#L47)
