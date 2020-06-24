const Promise = global.Promise = require("bluebird");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let database = null;

const startDatabase = function() {
    const mongo = new MongoMemoryServer();
    return mongo.getConnectionString()
        .then((mongoDBURL) => { 
            return MongoClient.connect(mongoDBURL, {useNewUrlParser : true}); })
        .then((connection) => { 
            database = connection.db(); 
            return database;
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