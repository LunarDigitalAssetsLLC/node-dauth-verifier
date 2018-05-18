const axios = require('axios');
const crypto = require('crypto');
const cryptico = require('cryptico');

exports.verify = function(username, code, hashcode){
    return new Promise(function(resolve, reject){
        var BASE_URL = "https://dauth.co/";
        var urlGetter = BASE_URL + "utils/url?username="+username;
        var addressGetter = BASE_URL + "utils/address?username="+username;
        var keyGetter = BASE_URL + "utils/key?username="+username;
        axios.get(urlGetter).then(function(aUrl){
        axios.get(keyGetter).then(function(aKey){
            var tokenRaw = crypto.createHash('sha256').update(Math.random().toString()).digest('base64').substr(0,10);
            var encrypted = cryptico.encrypt(tokenRaw, aKey.data, "").cipher;
            axios.post(aUrl.data+"?action=verify", {username:username,code:code, hashcode:hashcode, cipher: encrypted}).then(function(decrypted){
            if(decrypted.data == tokenRaw){
                resolve({success:true, message:username});
                return;
            }
            reject({success: false, message:"Incorrect credentials"});
            }).catch(function(error){
                reject({success: false, message:"Incorrect credentials"});
            });
        }).catch(function(error){
            reject({success: false, message:error});
        });
        }).catch(function(error){
            reject({success: false, message:error});
        });
    });
}
