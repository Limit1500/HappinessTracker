import { describe, it } from "node:test";
import { app } from "../app.js";
import request from "supertest";
import testQueries from "./testQueries.js";
import testPayloads from "./testPayloads.js";
import userUtils from "../utils/userUtils.js";

beforeAll(async () => {
  testQueries.deleteTestUsers();
});

describe("Users requests", () => {
  describe("SignIn", () => {
    it("Should return a 200 status code, user is signed in", async () => {
      const result = await request(app)
        .post("/signIn")
        .send(testPayloads.signInValidPayloadNo1);

      expect(result.statusCode).toBe(200);
    });
    it("Should return a 400 status code, usename or email already used", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/signIn")
        .send(testPayloads.signInValidPayloadNo1);

      expect(result.statusCode).toBe(400);
    });
    it("Should return a 400 status code, invalid data", async () => {
      const result = await request(app)
        .post("/signIn")
        .send(testPayloads.InvalidaPayload);

      expect(result.statusCode).toBe(400);
    });
  });

  describe("LogIn", () => {
    it("Should return a 200 status code, user is logged in", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.logInValidPayloadNo1);

      expect(result.statusCode).toBe(200);
    });
    it("Should return a 400 status code, invalid data", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.InvalidaPayload);

      expect(result.statusCode).toBe(400);
    });
    it("Should return a 400 status code, user not found", async () => {
      const result = await request(app)
        .post("/logIn")
        .send(testPayloads.logInValidPayloadNo1);

      expect(result.statusCode).toBe(400);
    });
  });

  describe("Delete user", () => {
    it("Should return a 200 status code, user deleted", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .get("/deleteUser")
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).toBe(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app).get("/deleteUser");

      expect(result.statusCode).toBe(400);
    });
  });

  describe("Edit user data", () => {
    it("Should return a 200 status code, user data edited", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.signInValidPayloadNo2)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).toBe(200);
    });
    it("Should return a 400 status code, token missing", async () => {
      testQueries.createTestUserNo1();

      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.signInValidPayloadNo2);

      expect(result.statusCode).toBe(400);
    });
    it("Should return a 400 status code, invalid credentials", async () => {
      const result = await request(app)
        .post("/editUserData")
        .send(testPayloads.InvalidaPayload)
        .set("Cookie", userUtils.createToken(Number(process.env.TEST_ID)));

      expect(result.statusCode).toBe(400);
    });
  });
});
