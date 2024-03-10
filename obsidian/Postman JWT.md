```
function jwt_decode(jwt) {
    var parts = jwt.split('.'); // header, payload, signature
    return JSON.parse(atob(parts[1]));
}

var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("serviceAuthToken", jsonData.access_token);

var jwt = jwt_decode(jsonData.access_token);

console.log(jwt);
```
