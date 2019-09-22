---
title: Adding the Visual Studio 2010 Command Prompt variables to your PowerShell profile
date: "2012-06-14"
---
If you add the following to your PowerShell profile then you’ll have access to all the commands only normally available by opening the Visual Studio 2010 Command Prompt:

<pre class="brush: plain;"># Set environment variables for Visual Studio Command Prompt
# Based on: http://stackoverflow.com/questions/2124753/how-i-can-use-powershell-with-the-visual-studio-2010-command-prompt
pushd 'c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC'
cmd /c "vcvarsall.bat&set" |
foreach {
  if ($_ -match "=") {
    $v = $_.split("="); set-item -force -path "ENV:\$($v[0])"  -value "$($v[1])"
  }
}
popd
write-host "`nVisual Studio 2010 Command Prompt variables set." -ForegroundColor Yellow</pre>

Your PowerShell profile will be somewhere like this:

<pre class="brush: plain;">C:\Users\trobinson\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1</pre>