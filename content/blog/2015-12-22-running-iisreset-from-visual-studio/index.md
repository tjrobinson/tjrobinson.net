---
title: Running IISRESET from Visual Studio
date: "2015-12-22"
---

If you want a quick way of running IISRESET from within Visual Studio:

Tools > External Tools…

[<img title="clip_image001" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; margin: 0px; display: inline; padding-right: 0px" border="0" alt="clip_image001" src="/images/2015/12/clip_image001_thumb.png" width="218" height="244" />](/images/2015/12/clip_image001.png)

Add a new menu item to run **C:\Windows\System32\iisreset.exe** (note the checkboxes at the bottom)…

[<img title="clip_image002" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; margin: 0px; display: inline; padding-right: 0px" border="0" alt="clip_image002" src="/images/2015/12/clip_image002_thumb.png" width="244" height="239" />](/images/2015/12/clip_image002.png)

You then get a new menu item…

[<img title="clip_image003" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; margin: 0px; display: inline; padding-right: 0px" border="0" alt="clip_image003" src="/images/2015/12/clip_image003_thumb.png" width="214" height="244" />](/images/2015/12/clip_image003.png)

And the output is displayed in the Output panel…

[<img title="clip_image004" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="clip_image004" src="/images/2015/12/clip_image004_thumb.png" width="244" height="127" />](/images/2015/12/clip_image004.png)

Depending on your UAC settings, you may need to be running Visual Studio as Administrator for this to work.
