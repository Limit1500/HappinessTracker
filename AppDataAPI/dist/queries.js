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
    try {
        let result = await pool.query("SELECT * FROM users WHERE username = $1", [
            username,
        ]);
        if (result.rowCount != 0) {
            throw new Error("INPUT ERROR: ursername already used");
        }
        result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rowCount != 0) {
            throw new Error("INPUT ERROR: email already used");
        }
    }
    catch (error) {
        throw error;
    }
}
export async function insertUser(username, email, password) {
    try {
        await pool.query("INSERT INTO users ( username, email, password ) VALUES ( $1, $2, $3 )", [username, email, password]);
        const response = await pool.query("SELECT * FROM users WHERE username = $1 AND email = $2 AND password = $3", [username, email, password]);
        return {
            username: response.rows[0].username,
            password: response.rows[0].password,
            email: response.rows[0].email,
            id: response.rows[0].id,
        };
    }
    catch (error) {
        throw error;
    }
}
export async function findUser(username, password) {
    const response = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
    if (response.rowCount === 1) {
        return {
            username: response.rows[0].username,
            password: response.rows[0].password,
            email: response.rows[0].email,
            id: response.rows[0].id,
        };
    }
    else {
        throw new Error("ERROR: user not found");
    }
}
