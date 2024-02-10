---
title: ASP.NET Core Antiforgery troubleshooting
---

Set a breakpoint in https://github.com/dotnet/aspnetcore/blob/main/src/Antiforgery/src/Internal/DefaultAntiforgery.cs 

On the line `throw new AntiforgeryValidationException(message);`
