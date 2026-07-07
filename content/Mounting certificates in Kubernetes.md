---
tags:
  - kubernetes
---
# Mounting certificates in Kubernetes

Example [kind](https://kind.sigs.k8s.io/) cluster configuration that mounts a corporate CA certificate (e.g. Zscaler) into the node so that TLS interception doesn't break image pulls and other outbound calls:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    #image: kindest/node:v1.25.16
    extraMounts:
      - hostPath: C:/Repos/kubernetes-goat/zscaler.pem
        containerPath: /etc/ssl/certs/zscaler.pem
```

## See also

- [[Kubernetes]]
