---
date: 2007-03-02T17:33:06+00:00
---
# ASP.NET debugging in Firefox - resources not loading


For a while I've had trouble with Firefox when using a local IIS 5 install to test/debug an ASP.NET application. Some of the images and other resources weren't loading, almost as if a limit had been hit. It would also show a login dialog box.

The solution is to go to _about:config_ in Firefox and make sure that _network.http.keep-alive_ is set to _true_.

The reason I'd set it to false in the past was so I could test a load balanced cluster.

**Update:** I’ve since found that the fix above doesn’t always work.

Something else which almost fixes this problem is to disable HTTP keep-alives via the site properties in IIS. Unfortunately this has the side effect of stopping debugging working in Visual Studio 2003.
