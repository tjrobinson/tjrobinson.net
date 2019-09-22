---
title: Using PowerShell to get the certificate information from a Base64 encoded string
date: "2018-06-18"
---
```powershell
$certBase64 = 'BASE64ENCODEDSTRINGGOESHERE'
$cert = [System.Security.Cryptography.X509Certificates.X509Certificate2]([System.Convert]::FromBase64String($certBase64))
$cert | Format-List *
```

Example output:

```
EnhancedKeyUsageList : {}
DnsNameList          : {BlaBla}
SendAsTrustedIssuer  : False
Archived             : False
Extensions           : {System.Security.Cryptography.Oid}
FriendlyName         :
IssuerName           : System.Security.Cryptography.X509Certificates.X500DistinguishedName
NotAfter             : 22/07/2034 10:42:43
NotBefore            : 22/07/2014 10:42:43
HasPrivateKey        : False
PrivateKey           :
PublicKey            : System.Security.Cryptography.X509Certificates.PublicKey
RawData              : {48, 130, 2, 234...}
SerialNumber         : XXXXXXXXXX
SubjectName          : System.Security.Cryptography.X509Certificates.X500DistinguishedName
SignatureAlgorithm   : System.Security.Cryptography.Oid
Thumbprint           : XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Version              : 3
Handle               : 000000000000000
Issuer               : CN=XXXXXXXXXXXXX, C=GB
Subject              : CN=XXXXXXXXXXXXX, C=GB
```
