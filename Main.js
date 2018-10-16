'use strict';
const Nebula = require('@nec-baas/jssdk').Nebula;
const fs = require('fs');
const config = require('./Config.js');

let gBucket;
let gObject;

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        console.log('Get Current User: Start');
        Nebula.User.queryCurrent()
            .then((user) => {
                console.log('Get Current User: Success: ' + JSON.stringify(user));
                resolve();
            })
            .catch((err) => {
                reject('Get Current User: Failure: ' + err);
            });
    });
}

const createObject = () => {
    return new Promise((resolve, reject) => {
        console.log('Create Object: Start');
        const obj = {'operation': 'CREATE'};
        gBucket.save(obj)
            .then((object) => {
                console.log('Create Object: Success: ' + JSON.stringify(object));
                gObject = object;
                resolve();
            })
            .catch((err) => {
                reject('Create Object: Failure: ' + err);
            });
    });
}

const readObject = () => {
    return new Promise((resolve, reject) => {
        console.log('Read Object: Start');
        gBucket.load(gObject._id)
            .then((object) => {
                console.log('Read Object: Success: ' + JSON.stringify(object));
                gObject = object;
                resolve();
            })
            .catch((err) => {
                reject('Read Object: Failure: ' + err);
            });
    });
}

const updateObject = () => {
    return new Promise((resolve, reject) => {
        console.log('Update Object: Start');
        gObject['operation'] = 'UPDATE';
        gBucket.save(gObject)
            .then((object) => {
                console.log('Update Object: Success: ' + JSON.stringify(object));
                gObject = object;
                resolve();
            })
            .catch((err) => {
                reject('Update Object: Failure: ' + err);
            });
    });
}

const deleteObject = () => {
    return new Promise((resolve, reject) => {
        console.log('Delete Object: Start');
        gBucket.remove(gObject._id)
            .then((id) => {
                console.log('Delete Object: Success: ' + id);
                resolve();
            })
            .catch((err) => {
                reject('Delete Object: Failure: ' + err);
            });
    });
}

/**
 *処理
 */
console.log('clientcert-sample-nodejs : START');

if(config.proxyHost != null) {
    Nebula.setHttpsProxy({host: config.proxyHost, port: config.proxyPort});
}

Nebula.initialize(config.NebulaConfig);

// クライアント証明書・CA証明書　読み込み.
try{
    Nebula.setClientCertificate({pfx:fs.readFileSync(config.clientCert),
                                passphrase:config.clientCertPassword,
                                ca:fs.readFileSync(config.trustedCaCert)});
}catch(e) {
    console.log(e.message);
    return;
}

console.log('isClientCertSet: ' + Nebula.isClientCertSet());

gBucket = new Nebula.ObjectBucket(config.objectBucketName);

getCurrentUser()
    .then(createObject)
    .then(readObject)
    .then(updateObject)
    .then(deleteObject)
    .catch((errLog) => {
        console.log(errLog);
    })
    .then(() => {
        Nebula.setClientCertificate(null);
        console.log('isClientCertSet : ' + Nebula.isClientCertSet());
        console.log('clientcert-sample-nodejs : END');
    });
