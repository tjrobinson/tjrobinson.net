---
tags:
  - dotnet
---
# dotnet

- [[Visual Studio]]
- [[Binding Redirects]]
- [[dotnet outdated]]
- [[ASP.NET Core Antiforgery troubleshooting]]
- [[2015-07-23-progressive-net-tutorials-2015|Progressive .NET Tutorials 2015]]
- [[2020-10-05-a-guide-to-the-microsoft-dotnet-sdks-for-azure-table-storage|A guide to the Microsoft .NET SDKs for Azure Table Storage]]

## New project setup

- Logging (Serilog)
- Docker-compose
- StyleCop + SonarAnalyzer
- Coding conventions (.editorconfig)

## Misc

Include a shared global usings file in test projects only:

```xml
<ItemGroup Condition="$(MSBuildProjectName.EndsWith('Tests'))">
    <Compile Include="GlobalUsings.Tests.cs" />
</ItemGroup>
```

- [Selenium.WebDriver 4.0.1 vs 4.0.0-alpha07 diff — fuget.org](https://www.fuget.org/packages/Selenium.WebDriver/4.0.1/lib/netstandard2.1/diff/4.0.0-alpha07/)

## TODO

- Need to update .NET 5 projects to 6 for LTS.
- What about Application Insights instead of Seq?
