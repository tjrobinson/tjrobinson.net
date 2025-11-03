- [EasyPIM](https://github.com/kayasax/EasyPIM)
- [MSIdentityTools](https://github.com/AzureAD/MSIdentityTools) - The Microsoft Identity Tools PowerShell module provides various tools for performing enhanced Identity administration activities. It is intended to address more complex business scenarios that can't be met solely with the use of MS Graph PowerShell SDK module.

# Scripts

Script to get group members from group

```powershell
# Get the group ID (replace with your actual group name)
$group = Get-MgGroup -Filter "displayName eq 'your-group-here'"
$groupId = $group.Id

# Get all members with full user details
$members = Get-MgGroupMember -GroupId $groupId -All | ForEach-Object {
    Get-MgUser -UserId $_.Id
}

# Select desired fields and export to CSV
$members | Select-Object DisplayName, UserPrincipalName | Export-Csv -Path "GroupMembers.csv" -NoTypeInformation
```
