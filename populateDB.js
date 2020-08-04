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
        json: true,
        body: obj,
    }).then((data) => {
        return data;
    });
};

Promise.try(() => {
    return createAd(firstAd);
});