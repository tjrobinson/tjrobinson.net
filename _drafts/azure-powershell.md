Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

Get-Module AzureRM -ListAvailable

Uninstall-Module AzureRM

Get-Module AzureRM -ListAvailable

Wait until there are none left

Install-Module -Name AzureRM
