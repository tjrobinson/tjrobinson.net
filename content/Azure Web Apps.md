---
tags:
  - azure
---
# Azure Web Apps

Removing Azure Web App staging slots using the Azure CLI:

```powershell
get-azwebapp | get-azwebappslot | remove-azwebappslot
```
