const { getDatabase } = require("./mongo");
const { ObjectID } = require("mongodb");

const collectionName = "ads";

const insertAd = function(ad) {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).insertOne(ad); 
        })
        .then((insertedData) => {            
            const result = Object.assign(ad, {_id : insertedData.insertedId});
            // console.log(result);
            return result;
        });
};

const getAds = function() {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).find({}).toArray(); 
        }).then((data) => {
            // console.log(data); 
            return data;
        });
};

const deleteAd = function(id) {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).deleteOne({ _id : new ObjectID(id), }); 
        });
};

const updateAd = function(id, ad) {
    return getDatabase()
        .then((database) => {
            return database.collection(collectionName).update({
                _id : new ObjectID(id),
            }, {
                $set: { ...ad, },
            });
        });
};

module.exports = {
    insertAd,
    getAds,
    updateAd,
    deleteAd,
};