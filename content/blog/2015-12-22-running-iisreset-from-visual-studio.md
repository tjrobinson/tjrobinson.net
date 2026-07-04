---
title: "Running IISRESET from Visual Studio"
date: "2015-12-22"
aliases:
  - blog/2015-12-22-running-iisreset-from-visual-studio/2015-12-22-running-iisreset-from-visual-studio
---

# Running IISRESET from Visual Studio

If you want a quick way of running IISRESET from within Visual Studio:

Tools > External Tools…

[Screenshot](2015-12-22-running-iisreset-from-visual-studio-clip_image001.png)

Add a new menu item to run **C:\Windows\System32\iisreset.exe** (note the checkboxes at the bottom)…

[Screenshot](2015-12-22-running-iisreset-from-visual-studio-clip_image002.png)

You then get a new menu item…

[Screenshot](2015-12-22-running-iisreset-from-visual-studio-clip_image003.png)

And the output is displayed in the Output panel…

[Screenshot](2015-12-22-running-iisreset-from-visual-studio-clip_image004.png)

Depending on your UAC settings, you may need to be running Visual Studio as Administrator for this to work.
