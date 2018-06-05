---
id: 281
title: Creating a self signed SSL certificate on Windows using PowerShell
date: 2017-04-28T09:10:01+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=281
permalink-from-wordpress: /?p=281
categories:
  - Uncategorized
---
Run this PowerShell command as Administrator:

    New-SelfSignedCertificate –DnsName *.local-dev.com –CertStoreLocation cert:\LocalMachine\My
    

Open _Manage Computer Certificates_ (typing _certificates_ in the Start menu should find it)

Open `Personal\Certificates`

Find the `*.local-dev.com` certificate that has an expiration date of a year from today. Delete any others for `*.local-dev.com` to avoid confusion later on.

Right-click and choose _Copy_.

Navigate to `Trusted Root Certification Authorities\Certificates`

Right-click and paste.

Restart your machine.

In IIS, update the bindings for all sites to use the SSL certificate created above, it will be called `*.local-dev.com`.

Source: https://kx.cloudingenium.com/microsoft/powershell/how-to-create-a-self-signed-san-certificate-on-powershell/