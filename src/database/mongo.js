const Promise = global.Promise = require("bluebird");
const { MongoClient } = require("mongodb");

let database = null;

const startDatabase = function() {
    return Promise.try(() => {
        const mongoDBURL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/db"
        return MongoClient.connect(mongoDBURL, {useNewUrlParser : true})
            .then((connection) => { 
                database = connection.db(); 
                return database;
            });
    });    
};

const getDatabase = function() {
    return Promise.try(() => {
        if(!database) { return startDatabase(); }
        return database;
    });
    
};

module.exports = {
    getDatabase, 
    startDatabase,
};
