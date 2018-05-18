# NodeJS DAuth Verifier
An easy way to setup a [DAuth](https://dauth.co) verifier endpoint.

## Usage

```
npm install node-dauth-verifier
```

On NodeJS + Express 

```
const dauth = require('node-dauth-verifier');
router.get("/", function(req, res, next){
    dauth.verify(req.query.username, req.query.code, req.query.hashcode).then(function(data){
        console.log("Login successful");
        // ... Logic for successful login ...
    }).catch(function(error){
        console.log("Login Failed");
        // ... Logid for failed login here ...
    });
});
```

## Build from source
Visit the [Dauth repository](https://github.com/madhavanmalolan/dauth) for more details.


