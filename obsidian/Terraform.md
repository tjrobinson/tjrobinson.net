# Terraform

- [Gripping Terraform in Azure DevOps to build Infrastructure](https://adamtheautomator.com/terraform-azure-devops/)
- [Azure DevOps Pipelines with Terraform and Stages](https://www.ciraltos.com/azure-devops-pipelines-with-terraform-and-stages/)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [Terratest | Automated tests for your infrastructure code.](https://terratest.gruntwork.io/)
- [Tools to Visualize your Terraform plan](https://medium.com/vmacwrites/tools-to-visualize-your-terraform-plan-d421c6255f9f)
- [[Octopus HCL Parser]]

Validation is quite handy:
![[Pasted image 20251019151206.png]]

Security issues with importing modules as you can reference a branch or tag:

```text
git::https://your-module-url//modules/module_name?ref=somethingDodgyHere
```

Can also be imported from various other untrusted source (GitHub over HTTP)

Some code can execute during the plan stage of Terraform, usually unprotected.
