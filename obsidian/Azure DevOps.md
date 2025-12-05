# Azure DevOps

- [Build Quality Checks - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mspremier.BuildQualityChecks)
- [Passing variables between jobs for Azure DevOps pipelines](https://gaunacode.com/passing-variables-between-jobs-for-azure-devops-pipelines)
- [Azure DevOps: Leveraging Stages with YAML Objects](https://techcommunity.microsoft.com/t5/healthcare-and-life-sciences/azure-devops-pipelines-leveraging-stages-with-yaml-objects/ba-p/3719136)
- [Error TF400486 reording work items on backlog - Developer Community](https://developercommunity.visualstudio.com/t/error-tf400486-reording-work-items-on-backlog/442064)
- [Define variables - Azure Pipelines | Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch)
- [How to Preview and Test a Changing YAML Pipeline on Azure DevOps – RazorSPoint](https://www.razorspoint.com/2020/03/13/how-to-preview-and-test-a-changing-yaml-pipeline-on-azure-devops/)
- [Terraform Pull Request Automation | Atlantis](https://www.runatlantis.io/)
- [Project Documentation from Azure DevOps Wikis - Paul Hatcher](https://blog.paulhatcher.com/2022/01/project-documentation-from-azure-devops-wikis/)
- [TFS/Azure DevOps Code Statistics](https://github.com/wandrille-hubert/AzureDevopsCodeStats)


## Useful API endpoints

https://dev.azure.com/{organisation}/_apis/hooks/subscriptions
 
https://dev.azure.com/{organisation}/_apis/hooks/consumers
 
https://dev.azure.com/{organisation}/_apis/hooks/publishers

### Recent PRs

https://dev.azure.com/{organisation}/{project}/_apis/git/pullrequests?searchCriteria.status=completed&api-version=6.0
https://dev.azure.com/{organisation}/_apis/git/pullrequests?searchCriteria.status=all&api-version=6.0

## Azure Pipelines

### Tasks to log all the files in the various working directories

```yaml
  - task: PowerShell@2
    displayName: List contents of Build.ArtifactStagingDirectory
    inputs:
        targetType: "inline"
        workingDirectory: '$(Build.ArtifactStagingDirectory)'
        script: |
        Get-ChildItem -Recurse |% { $_.FullName }

    - task: PowerShell@2
    displayName: List contents of Build.SourcesDirectory
    inputs:
        targetType: "inline"
        workingDirectory: '$(Build.SourcesDirectory)'
        script: |
        Get-ChildItem -Recurse |% { $_.FullName }

    - task: PowerShell@2
    displayName: List contents of Pipeline.Workspace
    inputs:
        targetType: "inline"
        workingDirectory: '$(Pipeline.Workspace)'
        script: |
        Get-ChildItem -Recurse |% { $_.FullName }

    - task: PowerShell@2
    displayName: List contents of Agent.BuildDirectory
    inputs:
        targetType: "inline"
        workingDirectory: '$(Agent.BuildDirectory)'
        script: |
        Get-ChildItem -Recurse |% { $_.FullName }
```
