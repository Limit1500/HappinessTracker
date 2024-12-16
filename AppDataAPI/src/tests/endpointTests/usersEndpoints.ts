import { describe, it } from "node:test";
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
        .post("/signIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, usename or email already used", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/signIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid data", async () => {
      const result = await request(app)
        .post("/signIn")
        .send(testPayloads.InvalidPayload);

      expect(result.statusCode).equal(400);
    });
  });

  describe("LogIn", () => {
    it("Should return a 200 status code, user is logged in", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, invalid data", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.InvalidPayload);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, user not found", async () => {
      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.ValidPayloadNo1);

      expect(result.statusCode).equal(400);
    });
  });

  describe("Delete user", () => {
    it("Should return a 200 status code, user deleted", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .get("/deleteUser")
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app).get("/deleteUser");

      expect(result.statusCode).equal(400);
    });
  });

  describe("Edit user data", () => {
    it("Should return a 200 status code, user data edited", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.ValidPayloadNo2)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.ValidPayloadNo2);

      expect(result.statusCode).equal(400);
    });
    it("Should return a 400 status code, invalid credentials", async () => {
      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.InvalidPayload)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).equal(400);
    });
  });
});
