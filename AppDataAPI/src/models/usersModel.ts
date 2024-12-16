import { pool } from "../config/database.js";
import { userData } from "../types/usersTypes.js";
import userUtils from "../utils/userUtils.js";

const usersModel = {
  async getUserByUsername(username: string) {
    return await pool.query(
      "SELECT password, id FROM users WHERE username = $1",
      [username]
    );
  },

  async getUserByEmail(email: string) {
    return await pool.query("SELECT password, id FROM users WHERE email = $1", [
      email,
    ]);
  },

  async postUser(username: string, password: string, email: string) {
    return await pool.query(
      "INSERT INTO users ( username, password, email ) VALUES ( $1, $2, $3 ) RETURNING id",
      [username, password, email]
    );
  },

  async deleteUserById(id: number) {
    return await pool.query("DELETE FROM users WHERE id = $1", [id]);
  },

  async editUserData(
    username: string,
    password: string,
    email: string,
    id: number
  ) {
    try {
      const response = await pool.query(
        "UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4",
        [username, password, email, id]
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersModel;
