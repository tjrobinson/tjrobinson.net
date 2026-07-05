---
tags:
  - kubernetes
---
# Kubernetes


## Security

- RBAC
- Workload Identity

## Certification

- CKA
- CKAD
- KCSA
  - [[Kubernetes and Cloud Native Security Associate (KCSA)]]

## Useful commands

```shell
kubectl config get-contexts
```

```shell
kubectl config use-context docker-desktop
```

```shell
docker container ls
```

```shell
az acr login --name 'xxxxxxxxxxxxxxxxx'
```

Get all service accounts:

```shell
kubectl get sa --all-namespaces
```
