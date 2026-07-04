# dotnet

- [[Visual Studio]]
- [[Binding Redirects]]
- [[dotnet outdated]]
- [[2015-07-23-progressive-net-tutorials-2015]]
- [[ASP.NET Core Antiforgery troubleshooting]]
- [[2020-10-05-a-guide-to-the-microsoft-dotnet-sdks-for-azure-table-storage]]

## New project setup

- Logging (Serilog)
- Docker-compose
- StyleCop + SonarAnalyzer
- Coding conventions (.editorconfig)


Misc

    <ItemGroup Condition="$(MSBuildProjectName.EndsWith('Tests'))">
        <Compile Include="GlobalUsings.Tests.cs" />
    </ItemGroup>



    https://www.fuget.org/packages/Selenium.WebDriver/4.0.1/lib/netstandard2.1/diff/4.0.0-alpha07/


    Need to update .NET 5 projects to 6 for LTS


    What about Application Insights instead of Seq?