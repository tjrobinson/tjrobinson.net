- [How to visualize graphs in Kusto using Plotly and Python](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/how-to-visualize-graphs-in-kusto-using-plotly-and-python/ba-p/3943410)
- [Threat hunting with Microsoft Sentinel](https://secure.microsoft.com/en-US/sessions/69142236-94d1-4af0-912c-b1525071ff0c?source=sessions)
- [Microsoft Security Webinar: Modernise your SOC with Microsoft Sentinel & AI | Watch Now](https://info.microsoft.com/UK-ModSO-VDEO-FY24-09Sep-26-Microsoft-Security-Webinar-Modernise-your-SOC-with-Microsoft-Sentinel-AI-AID-3061953-SREVM23385_LP02-Thank-You---Standard-Hero.html)
- [Azure/Azure-Sentinel: Cloud-native SIEM for intelligent security analytics for your entire enterprise.](https://github.com/Azure/Azure-Sentinel)
- [rod-trent/Sentinel-SOC-101: Content and collateral for the Microsoft Sentinel SOC 101 series](https://github.com/rod-trent/Sentinel-SOC-101)
- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/azuresentinel.azure-sentinel-solution-abuseipdb?tab=overview)
- [[KQL]]

## Useful queries

Find any changes to access package policies:

```kql
AuditLogs
| where TimeGenerated > ago(730d)
| where Category == "EntitlementManagement"
| where ActivityDisplayName contains "policy"
| mv-expand TargetResources, AdditionalDetails
| where tostring(TargetResources.id) == "2f28e35c-3d01-46b4-b820-5dfff2aa08e5"
```
