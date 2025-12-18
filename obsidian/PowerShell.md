# PowerShell

- [Accessing PowerShell Properties and Variables with Periods (and other special characters) in their Name](https://blog.danskingdom.com/accessing-powershell-variables-with-periods-in-their-name/)

From: https://www.hanselman.com/blog/F7IsTheGreatestPowerShellHotkeyThatNoOneUsesAnyMoreWeMustFixThis.aspx

> Did you also know that `PSReadline` logs all your commands to disk by default? Have a look at it:
> `notepad (Get-PSReadLineOption).HistorySavePath`
> After this you'll think twice before copy-pasting plain-text secrets into the console...

## PowerShell Profile - `Microsoft.PowerShell_profile.ps1`

```powershell
Write-Host "Applying custom profile"

Import-Module PSReadLine
Import-Module posh-git

# Tab - Gives a menu of suggestions
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# UpArrow will show the most recent command
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# DownArrow will show the least recent command
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# During auto completion, pressing arrow key up or down will move the cursor to the end of the completion
Set-PSReadLineOption -HistorySearchCursorMovesToEnd

# Shows tooltip during completion
Set-PSReadLineOption -ShowToolTips

# Gives completions/suggestions from historical commands
Set-PSReadLineOption -PredictionSource History

Set-Alias -Name tf -Value terraform
```
