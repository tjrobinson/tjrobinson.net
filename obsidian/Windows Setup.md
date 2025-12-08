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
``
