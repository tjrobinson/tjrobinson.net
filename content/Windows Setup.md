---
tags:
  - windows
  - setup
---
# Windows Setup

Notes for setting up a new Windows machine.

## Initial setup

Reboot plenty of times and after doing any significant changes.

### Updates

Reboot after applying updates and then re-check, as some updates won't come up until after others are installed.

- Check Windows Update
- Check Microsoft Store

### Drivers

- Connect mouse via Bluetooth - automatically prompts to install Logi Options+

### Enable virtualisation and WSL

```shell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
wsl --install
```

## Tools

Install with [[WinGet]]:

```shell
winget install Microsoft.DotNet.SDK.10
winget install --exact --id Microsoft.PowerShell --source winget
winget install --exact --id Hashicorp.Terraform --source winget
winget install --exact --id bruno.bruno
winget install --exact --id Microsoft.AzureCLI
winget install --exact --id Kubernetes.kubectl
winget install --exact --id Microsoft.Azure.Kubelogin
winget install --exact --id Derailed.k9s
```

```shell
az login
```

Also:

- ReSharper extension for VS Code
- SmartGit

## Git and .NET tooling

```shell
git config --global user.name "Tom Robinson"
git config --global user.email "XXXXXXXXXXXXXXX"
dotnet tool install --global dotnet-outdated-tool
```

## PowerShell modules

```powershell
Install-Module SqlServer
Install-Module PSReadLine
Install-Module posh-git
```

See [[PowerShell]] for the profile that uses these.

## Chocolatey packages

```text
choco list
chocolatey 2.2.2
chocolatey-compatibility.extension 1.0.0
chocolatey-core.extension 1.4.0
cyberchef 10.8.2
graphviz 9.0.0
jq 1.7.0
k9s 0.32.7
kubernetes-cli 1.29.1
kubernetes-helm 3.14.1
kubescape 3.0.7
skaffold 2.10.1
sysinternals 2024.2.13
terraform 1.12.2
tfsec 1.28.1
```

## npm global packages

```text
npm list -g --depth=0
+-- @techdocs/cli@1.8.5
+-- gatsby-cli@5.13.3
+-- json-schema-faker-cli@5.0.6
+-- jwt-cli@2.0.0
+-- linkinator@4.1.2
+-- markdown-link-check@3.11.2
+-- npm-check-updates@16.10.15
+-- npm@10.9.0
+-- prettier@3.0.0
+-- prettylint@2.0.0
+-- rimraf@5.0.1
+-- snyk@1.1294.0
`-- vsts-npm-auth@0.43.0
```

## Links

- [antonbabenko/pre-commit-terraform](https://github.com/antonbabenko/pre-commit-terraform)

## See also

- [[WinGet]]
- [[Disabling Bing search on the Windows start menu]]
