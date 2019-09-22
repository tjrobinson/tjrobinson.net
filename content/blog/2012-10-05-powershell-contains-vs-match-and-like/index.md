---
title: 'Powershell: -contains vs. -match and -like'
date: 2012-10-05T11:13:13+00:00
---
I recently discovered a problem where the _Where-Object_&nbsp;_–contains_ operator wasn’t doing what I thought it was, i.e. the equivalent of _String.Contains()_ in C#. For example:

(Get-Item .\MyDirectory) | where { $_.Attributes -contains "Directory" }

Is not the same as:

(Get-Item .\MyDirectory) | where { $_.Attributes -match "Directory" }

The former fails if the directory has more than one attribute. The reason for this is:

_-contains_ is designed to work on arrays, not strings (referred to as a containment operator)  
_-match_ looks for a match inside a string and supports regexes  
-_like_ looks for a match inside a string and supports wildcards

So if the directory only has one attribute then _–contains_ sees it as an array with a single entry “Directory” and returns true.  
But if the directory has multiple attributes then _–contains_ still sees it as an array with a single entry but the value of that entry is “Directory,NotIndexed” so returns false.

[http://www.techotopia.com/index.php/Windows\_PowerShell\_1.0\_Comparison\_and\_Containment\_Operators](http://www.techotopia.com/index.php/Windows_PowerShell_1.0_Comparison_and_Containment_Operators)