"use strict";

const { assert } = require("chai");
const { ObjectID } = require("mongodb");
const adsLogic = require("../src/database/ads");

describe("Test the app logic", function() {
    const id = new ObjectID();
    const testData = {
        _id: id,
        firstName: "John",
        lastName: "Doe",
        birthDate: "1932-11-08",
        mailAdress: "john.doe@domain.com"
    };

    before(function() {
    });

    after(function() {
    });

    it("inserts data to database", function() {
        return adsLogic.insertAd(testData)
            .then((data) => {
                assert.isObject(data);
                assert.hasAllKeys(data, Object.keys(testData));
                assert.deepEqual(data._id, testData._id);
                assert.strictEqual(data.mailAdress, testData.mailAdress);
            });
    });

    // it("gets all data from database", function() {
    //     return adsLogic.getAds()
    //         .then((data) => {
    //             console.log(data);
    //             assert.isArray(data);
    //         });
    // });

    it("updates data to database", function() {
        return adsLogic.updateAd(testData._id, {firstName: "Jane", mailAdress: "jane.doe@domain.com"})
            .then((data) => {
                assert.isObject(data);
                assert.hasAllKeys(data, Object.keys(testData));
                assert.deepEqual(data._id, testData._id);
                assert.strictEqual(data.firstName, "Jane");
                assert.strictEqual(data.mailAdress, "jane.doe@domain.com");
            });
    });

    it("deletes data from database", function() {
        return adsLogic.deleteAd(testData._id)
            .then((data) => {
                // console.log(data);
                assert.isObject(data);
                assert.hasAllKeys(data, ["lastErrorObject", "value", "ok"]);
                assert.hasAllKeys(data.value, Object.keys(testData));
                assert.deepEqual(data.value._id, testData._id);
            });
    });

    
});