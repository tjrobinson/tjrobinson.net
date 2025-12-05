---
title: Deleting files that Windows can’t delete
date: "2013-03-19"
---
# Deleting files that Windows can’t delete


I recently downloaded some files from Salesforce Chatter which ended in "|."

If Windows won't let you delete them (it says they don't exist), SysInternals sdelete will:

C:\tools\SysinternalsSuite\sdelete.exe /s "\\?\C:\Users\TRobinson\Desktop\Over the next few weeks|."
