# Access Packages

## Known issues

- Confusion and feature differences between `beta` and `v1` API
- PATCH endpoints missing for many resources, e.g. policies
- PIM vs Access Packages
- Hourly access not supported for access packages
- Multiple approval stages not supported for PIM?
- Custom extensions - can we remove need for Logic Apps and just use HTTP calls
- Terraform provider - needs updating to use `v1` API

## Sentinel query to get access package policy change information

```kql
let policyIds = dynamic([
    // Add policy IDs here
]);

AuditLogs
| where TimeGenerated > ago(365d)
| where Category == "EntitlementManagement"
| where ActivityDisplayName == "Update access package assignment policy"
| mv-apply ad = AdditionalDetails on (
    summarize AdditionalDetails =
        make_bag(
            pack(tostring(ad.key), ad.value)
        )
)
| mv-expand TargetResources
| where tostring(TargetResources.id) in (policyIds)
| mv-expand modifiedProperties = TargetResources.modifiedProperties
| extend ModifiedPropertyName = tostring(modifiedProperties.displayName)
| where tostring(modifiedProperties.displayName)
        in ('PrimaryApprovers', 'Access package assignments expire after')
| project
    TimeGenerated,
    OperationName,
    Identity,
    PolicyId   = TargetResources.id,
    PolicyName = TargetResources.displayName,
    ModifiedPropertyName,
    OldValue = tostring(modifiedProperties.oldValue),
    NewValue = tostring(modifiedProperties.newValue),
    AdditionalDetails
```