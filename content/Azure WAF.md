# Azure WAF

## Useful queries

```kql
AzureDiagnostics 
| where OperationName == "ApplicationGatewayFirewall" 
| where clientIp_s == "IP_ADDRESS_HERE"
| where policyScopeName_s == "POLICY_NAME_HERE"
| where (action_s == "Blocked") or (action_s == "Matched")
| summarize count() by clientIp_s, requestUri_s, Message, policyScopeName_s, ruleId_s, TimeGenerated
| order by count_ desc
```
