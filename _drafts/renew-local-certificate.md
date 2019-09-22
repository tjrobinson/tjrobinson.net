---
title: Renew local certificate
date: "2019-04-28"
---

```
netsh http delete sslcert ipport=0.0.0.0:443
```

```
netsh http add sslcert ipport=0.0.0.0:443 certhash=NEWCERTHASHTHUMBPRINT appid={00112233-4455-6677-8899-AABBCCDDEEFF}
```

```
netsh http show sslcert > c:\sslcert.txt
```