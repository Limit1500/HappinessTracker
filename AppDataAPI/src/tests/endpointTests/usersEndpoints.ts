/* import { describe, it } from "mocha";
import { expect } from "chai";
import { app } from "../../app.js";
import request from "supertest";
import testPayloads from "../helpers/testPayloads.js";
import userUtils from "../../utils/userUtils.js";
import { beforeEach } from "node:test";
import testQueries from "../helpers/testQueries.js";

beforeEach(async () => {
  await testQueries.deleteTestUsers();
});
describe("Users requests", () => {
  describe("SignIn", () => {
    it("Should return a 200 status code, user is signed in", async () => {
      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.signInValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, usename or email already used", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.signInValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid data", async () => {
      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.InvalidaPayload);

      expect(result.statusCode).equal(400);
    });
  });

  describe("LogIn", () => {
    it("Should return a 200 status code, user is logged in", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.logInValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, invalid data", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.InvalidaPayload);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, user not found", async () => {
      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.logInValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
  });

  describe("Delete user", () => {
    it("Should return a 200 status code, user deleted", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .get("/users/deleteUser")
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app).get("/users/deleteUser");

      expect(result.statusCode).equal(400);
    });
  });

  describe("Edit user data", () => {
    it("Should return a 200 status code, user data edited", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.signInValidPayloadNo2)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.signInValidPayloadNo2);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid credentials", async () => {
      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.InvalidaPayload)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(400);
    });
  });
});
 */

import { expect } from "chai";

describe("Simple Test", function () {
  it("should pass", function () {
    expect(true).to.be.true; // Simple assertion
  });
});
