"use strict";

const Promise = global.Promise = require("bluebird");
const request = Promise.promisifyAll(require("request").defaults({jar: true}), {
  filter: (funcName) => { return /put|patch|post|head|del(ete)?|get/.test(funcName); },
  multiArgs: true,
});

const firstAd = {
    firstname: "Patrick",
    lastname: "Rothfuss",    
};

const secondAd = {
    firstname: "Ben",
    lastname: "Bova",
    birthDate: "1932-11-08"  
};

const createAd = function(obj) {
    return request.postAsync({
        uri: "http://localhost:3001/",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        json: true,
        body: obj,
    }).then((data) => {
        // console.log(data);
        return data[1];
    });
};

Promise.try(() => {
    return Promise.all([
        createAd(firstAd),
        createAd(secondAd),
    ]).then(console.log);
});