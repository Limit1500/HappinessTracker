import { pool } from "./database.js";
export async function checkDatabaseConnection() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("Database connected");
    }
    catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}
export async function checkUserData(username, email, password) {
    let result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    if (result.rowCount != 0) {
        throw new Error("ERROR: ursername already used");
        return;
    }
    result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rowCount != 0) {
        throw new Error("ERROR: email already used");
        return;
    }
}
export async function insertUser(username, email, password) {
    await pool.query("INSERT INTO users ( username, email, password ) VALUES ( $1, $2, $3 )", [username, email, password]);
}
export async function findUser(username, password) {
    const response = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
    if (response.rowCount === 1) {
        return response.rows[0].email;
    }
    else {
        throw new Error("ERROR: user not found");
    }
}
