---
title: "UAC, Windows 10 and Visual Studio"
date: "2015-08-25"
tags:
  - windows
  - visual-studio
---

# UAC, Windows 10 and Visual Studio

- [Can you force Visual Studio to always run as an administrator in Windows 8? — Stack Overflow](http://stackoverflow.com/questions/12257110/can-you-force-visual-studio-to-always-run-as-an-administrator-in-windows-8)

`fix.reg`:

```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers]

"C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE\\devenv.exe"="~ RUNASADMIN"
```
