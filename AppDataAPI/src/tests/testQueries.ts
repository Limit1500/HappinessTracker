import { pool } from "../config/database.js";
import userUtils from "../utils/userUtils.js";

const testQueries = {
  async deleteTestUsers() {
    await pool.query("DELETE FROM users WHERE username = $1", [
      process.env.TEST_USERNAME_1,
    ]);
    await pool.query("DELETE FROM users WHERE username = $1", [
      process.env.TEST_USERNAME_2,
    ]);
  },
  async createTestUserNo1() {
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
      [
        process.env.TEST_USERNAME_1,
        process.env.TEST_PASSWORD_1,
        process.env.TEST_EMAIL_1,
      ]
    );
  },
  async createTestUserNo2() {
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
      [
        process.env.TEST_USERNAME_2,
        process.env.TEST_PASSWORD_2,
        process.env.TEST_EMAIL_2,
      ]
    );
  },
};

export default testQueries;
