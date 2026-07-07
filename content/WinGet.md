---
tags:
  - windows
---
# WinGet

Upgrade all packages to their latest versions:

```shell
winget upgrade --all
```

Pin Azure CLI to any 2.76.x version (prevents auto-upgrades beyond that):

```shell
winget pin add --id Microsoft.AzureCLI --version 2.76.*
```

Remove the pin on Azure CLI:

```shell
winget pin remove --id Microsoft.AzureCLI
```

Force install a specific version (2.76.0) of Azure CLI, overwriting the existing installation:

```shell
winget install --id Microsoft.AzureCLI --version 2.76.0 --force
```

## See also

- [[Windows Setup]]
