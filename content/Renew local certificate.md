---
tags:
  - certificates
  - windows
---
# Renew local certificate

Replacing the SSL certificate bound to port 443 in HTTP.sys (e.g. for local development behind `netsh`/IIS Express).

Delete the old binding:

```shell
netsh http delete sslcert ipport=0.0.0.0:443
```

Add the new certificate (using its thumbprint):

```shell
netsh http add sslcert ipport=0.0.0.0:443 certhash=NEWCERTHASHTHUMBPRINT appid={00112233-4455-6677-8899-AABBCCDDEEFF}
```

Check the result:

```shell
netsh http show sslcert > c:\sslcert.txt
```

## See also

- [[2017-04-28-creating-a-self-signed-ssl-certificate-on-windows-using-powershell|Creating a self signed SSL certificate on Windows using PowerShell]]
- [[Using PowerShell to get the certificate information from a Base64 encoded string]]
