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