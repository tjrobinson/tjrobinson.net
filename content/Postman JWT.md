---
tags:
  - api
---
# Postman JWT

A Postman test script that decodes a JWT from the response and stores the access token in an environment variable:

```javascript
function jwt_decode(jwt) {
    var parts = jwt.split('.'); // header, payload, signature
    return JSON.parse(atob(parts[1]));
}

var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("serviceAuthToken", jsonData.access_token);

var jwt = jwt_decode(jsonData.access_token);

console.log(jwt);
```

## See also

- [[APIs]]
