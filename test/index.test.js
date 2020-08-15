"use strict";

const request = require("supertest");
const { assert } = require("chai");
// const server = require("../src/index").server;

describe("Loading the app", function() {
    let server;
    const testData = {
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
    });

    it("responds with json", function() {
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
});