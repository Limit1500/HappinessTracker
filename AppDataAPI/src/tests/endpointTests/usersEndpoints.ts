import { describe, it } from "mocha";
import { expect } from "chai";
import { app } from "../../app.js";
import request from "supertest";
import testPayloads from "../helpers/testPayloads.js";
import { beforeEach } from "node:test";
import testQueries from "../helpers/testQueries.js";
import { pool } from "../../config/database.js";
import userUtils from "../../utils/userUtils.js";

describe("Users requests", () => {
  describe("SignIn", () => {
    it("Should return a 200 status code, user is signed in", async () => {
      await testQueries.deleteTestUsers();

      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, usename or email already used", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid data", async () => {
      await testQueries.deleteTestUsers();
      const result = await request(app)
        .post("/users/signIn")
        .send(testPayloads.InvalidPayload);

      expect(result.statusCode).equal(400);
    });
  });

  describe("LogIn", () => {
    it("Should return a 200 status code, user is logged in", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, invalid data", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.InvalidPayload);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, user not found", async () => {
      await testQueries.deleteTestUsers();
      const result = await request(app)
        .post("/users/logIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
  });

  describe("Delete user", () => {
    it("Should return a 200 status code, user deleted", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .get("/users/deleteUser")
        .set(
          "Cookie",
          `token=${userUtils.createToken(Number(process.env.TEST_ID))}`
        );

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app).get("/users/deleteUser");

      expect(result.statusCode).equal(400);
    });
  });

  describe("Edit user data", () => {
    it("Should return a 200 status code, user data edited", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.ValidPayloadNo2)
        .set(
          "Cookie",
          `token=${userUtils.createToken(Number(process.env.TEST_ID))}`
        );

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      await testQueries.deleteTestUsers();
      await testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.ValidPayloadNo2);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid credentials", async () => {
      await testQueries.deleteTestUsers();
      const result = await request(app)
        .post("/users/editUserData")
        .send(testPayloads.InvalidPayload)
        .set(
          "Cookie",
          `token=${userUtils.createToken(Number(process.env.TEST_ID))}`
        );

      expect(result.statusCode).equal(400);
    });
  });
});
