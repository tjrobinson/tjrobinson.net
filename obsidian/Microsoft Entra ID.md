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

## Dynamic groups

You can create dynamic groups, using the "Dynamic membership rules" feature:

```text
(user.memberof -any (group.objectid -in ['fb9a379d-f830-4d02-aa9a-b79c4f44392b']) and user.memberof -any (group.objectid -in ['a296202e-90b7-4e98-9f27-e7966ee7b2e7']))
```

Updates can be slow however, so it doesn't work that well for access packages.

Currently it’s in fact not possible to create a group membership rule that takes into consideration when a user is a member of two different groups. See: [Configure dynamic membership groups with the memberOf attribute in the Azure portal (preview)](https://learn.microsoft.com/en-gb/entra/identity/users/groups-dynamic-rule-member-of)

Additionally, the memberOf attribute can't be used with other operators. For example, you can't create a rule that states "Members Of group A can't be in Dynamic group B."

The dynamic group rule builder and validate feature can't be used for memberOf at this time.

https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership#supported-expression-operators
