"use strict";

const { assert } = require("chai");
const { ObjectID } = require("mongodb");
const adsLogic = require("../src/database/ads");

describe("Loading the app", function() {
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
                assert.strictEqual(data._id, testData._id);
                assert.strictEqual(data.mailAdress, testData.mailAdress);
            });
    });

    it("gets all data from database", function() {
        return adsLogic.getAds()
            .then((data) => {
                console.log(data);
                assert.isArray(data);
            });
    });

    // it("responds 404 to GET /foo/bar", function() {
    //     return request(server)
    //         .get("/foo/bar")
    //         .expect(404);
    // });

    // it("creates the resource", function() {
    //     return request(server)
    //         .post("/")
    //         .send(testData)
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .then((response) => {
    //             assert.isObject(response.body);
    //             assert.hasAllKeys(response.body, ["_id", "firstName", "lastName", "birthDate", "mailAdress"]);
    //         });
    // });

    // it("deletes the resource", function() {
    //     return request(server)
    //         .delete(`/${testData._id}`)
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .then((response) => {
    //             assert.isObject(response.body);
    //         });
    // });
});