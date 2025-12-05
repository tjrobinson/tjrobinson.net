- [Accessing PowerShell Properties and Variables with Periods (and other special characters) in their Name](https://blog.danskingdom.com/accessing-powershell-variables-with-periods-in-their-name/)

From: https://www.hanselman.com/blog/F7IsTheGreatestPowerShellHotkeyThatNoOneUsesAnyMoreWeMustFixThis.aspx

> Did you also know that `PSReadline` logs all your commands to disk by default? Have a look at it:
> `notepad (Get-PSReadLineOption).HistorySavePath`
> After this you'll think twice before copy-pasting plain-text secrets into the console...



```powershell
Install-Module PSReadLine -AllowPrerelease -Force
Install-module -name Az.Tools.Predictor

code $profile

# https://www.hanselman.com/blog/adding-predictive-intellisense-to-my-windows-terminal-powershell-prompt-with-psreadline
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```