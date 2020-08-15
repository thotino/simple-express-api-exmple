"use strict";

const request = require("supertest");
const { assert } = require("chai");
const { ObjectID } = require("mongodb");
// const server = require("../src/index").server;

describe("Loading the app", function() {
    let server;
    const id = new ObjectID();
    const testData = {
        _id: id,
        firstName: "John",
        lastName: "Doe",
        birthDate: "1932-11-08",
        mailAdress: "john.doe@domain.com"
    };

    before(function() {
        server = require("../src/index").server;
    });

    after(function() {
        server.close();
    });

    it("responds to /", function() {
        return request(server)
            .get("/")
            .expect(200)
            .expect("Content-Type", /json/);
            // .then((response) => {
            //     assert.isArray(response);
            // });
    });

    it("responds 404 to GET /foo/bar", function() {
        return request(server)
            .get("/foo/bar")
            .expect(404);
    });

    it("creates the resource", function() {
        return request(server)
            .post("/")
            .send(testData)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                assert.isObject(response.body);
                assert.hasAllKeys(response.body, ["_id", "firstName", "lastName", "birthDate", "mailAdress"]);
            });
    });

    // it("updates the resource", function() {
    //     return request(server)
    //         .put(`/${testData._id}`)
    //         .send({firstName: "Jane", mailAdress: "jane.doe@domain.com"})
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .then((response) => {
    //             assert.isObject(response.body);
    //             assert.hasAllKeys(response.body, ["_id", "firstName", "lastName", "birthDate", "mailAdress"]);
    //         });
    // });

    it("deletes the resource", function() {
        return request(server)
            .delete(`/${testData._id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                assert.isObject(response.body);
            });
    });
});