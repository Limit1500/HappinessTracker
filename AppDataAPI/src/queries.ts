import { pool } from "./server.js";

export async function checkUserData(
  username: string,
  email: string,
  password: string
) {
  let result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (result.rowCount != 0) {
    throw new Error("ERROR: ursername already used");
  }

  result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rowCount != 0) {
    throw new Error("ERROR: email already used");
  }
}

export async function insertUser(
  username: string,
  email: string,
  password: string
) {
  await pool.query(
    "INSERT INTO users ( username, email, password ) VALUES ( $1, $2, $3 )",
    [username, email, password]
  );
}
