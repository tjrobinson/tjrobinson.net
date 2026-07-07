---
tags:
  - entra
  - identity
  - iam
---
# Access Packages

## Known issues

- Confusion and feature differences between `beta` and `v1` API
- PATCH endpoints missing for many resources, e.g. policies
- PIM vs Access Packages
- Hourly access not supported for access packages
- Multiple approval stages not supported for PIM?
- Custom extensions - can we remove need for Logic Apps and just use HTTP calls
- Terraform provider - needs updating to use `v1` API
- Hidden/unpublished access packages still appear in recently used list, and via direct links.

## Terraform and the Microsoft Graph provider

- [Announcing MSGraph provider public preview and the Microsoft Terraform VS Code extension](https://techcommunity.microsoft.com/blog/azuretoolsblog/announcing-msgraph-provider-public-preview-and-the-microsoft-terraform-vscode-ex/4443614)
- [microsoft/msgraph provider — Terraform Registry](https://registry.terraform.io/providers/microsoft/msgraph/latest)
- [microsoft/terraform-provider-msgraph — GitHub](https://github.com/microsoft/terraform-provider-msgraph)
- [Quickstart: create Microsoft Graph resources with Terraform — Microsoft Learn](https://learn.microsoft.com/en-gb/graph/templates/terraform/quickstart-create-terraform)
- [`response_export_values` and JMESPath queries — azapi provider docs](https://registry.terraform.io/providers/Azure/azapi/latest/docs/guides/feature_jmes_query)
- [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
- [Terraform for Microsoft Graph resources — cloudtips.nl](https://cloudtips.nl/terraform-for-microsoft-graph-resources-9ea4b34b63e9)
- [Azure Terraform VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureterraform)

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

## See also

- [[Microsoft Entra ID]]
- [[Sentinel]]
- [[Terraform]]
