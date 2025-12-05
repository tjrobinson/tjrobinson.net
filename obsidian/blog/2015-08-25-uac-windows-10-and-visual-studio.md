---
title: UAC, Windows 10 and Visual Studio
date: "2015-08-25"
---
# 2015-08-25-uac-windows-10-and-visual-studio


http://stackoverflow.com/questions/12257110/can-you-force-visual-studio-to-always-run-as-an-administrator-in-windows-8

fix.reg:

Windows Registry Editor Version 5.00

[HKEY\_CURRENT\_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers]

"C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE\\devenv.exe"="~ RUNASADMIN"
