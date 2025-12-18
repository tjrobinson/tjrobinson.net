# Machine Setup

## Initial setup

Reboot plenty of times and after doing any significant changes.

### Updates

Reboot after applying updates and then re-check as some updates won't come up until after others are installed.

* Check Windows Update
* Check Microsoft Store

### Drivers

* Connect mouse via Bluetooth - automatically prompts to install Logi Options+

### Enable virtualisation and WSL

```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
wsl --install
```

```
winget install Microsoft.DotNet.SDK.10
```

```
winget install --exact --id Microsoft.PowerShell --source winget
winget install --exact --id Hashicorp.Terraform --source winget
winget install --exact --id bruno.bruno
winget install --exact --id Microsoft.AzureCLI
winget install --exact --id Kubernetes.kubectl
winget install --exact --id Microsoft.Azure.Kubelogin
winget install --exact --id Derailed.k9s

az login

Resharper extension for VS Code

SmartGit

git config --global user.name "Tom Robinson"
git config --global user.email "XXXXXXXXXXXXXXX"
dotnet tool install --global dotnet-outdated-tool



Install-Module SqlServer
Install-Module PSReadLine
Install-Module posh-git

``

```bash
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

```bash
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

https://github.com/antonbabenko/pre-commit-terraform
