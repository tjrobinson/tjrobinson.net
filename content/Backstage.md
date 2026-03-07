# Backstage

Plugins and extensions can be set in `mkdocs.yaml`:

```
nav:
  - Home: index.md
plugins:
  - techdocs-core
  - search
markdown_extensions:
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
  - md_in_html
```

https://backstage.io/docs/features/software-catalog/descriptor-format/#specprovidesapis-optional

https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/

You can also embed references to Open API specs in the catalog-info.yaml

```yaml
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: openapi-template
  description: | 
    Provides the basic template for API entities in Backstage based on OpenAPI. OpenAPI is used to describe both APIs and Webhooks (APIs to publish in the developer portal, Webhooks to provide to customers to describe what they need to implement).
    
    Copy this to your repository in readiness for generating your API description document. This file will be concatenated with your API description document generated from source code in CI. Teams must edit the `metadata` and `spec` sections to their needs, with the exception of the `definition` property **which will be updated in the build**.

    **PLEASE READ THE GUIDANCE ON THE ANNOTATIONS IN THIS EXAMPLE IN THE README. THEY ARE IMPORTANT FOR THE BUILD TO FUNCTION CORRECTLY.**
spec:
  type: openapi
  lifecycle: production
  owner: guests
  system: examples
  definition: |
    openapi: 3.0.3
    info:
      title: Placeholder API
      description: This is a placeholder and will be replaced during build. **DO NOT ADD YOUR OPENAPI DOCUMENT HERE. REFERENCE IT THROUGH AN ANNOTATION**.
      version: 0.0.1
    paths:
      /:
        get:
          summary: Example get on collection
          responses:
            "200":
              description: Example response
```
