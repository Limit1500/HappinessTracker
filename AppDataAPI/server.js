import express from "express";
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 4200;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'D_QWERTY_T9',
    port: 5432
});

const checkDatabaseConnection = async () => {
    try {
        await pool.query('INSERT INTO comments (author_id, text) VALUES ($1, $2);', [2, '5432 works']); // Test query
        console.log("Database connected and test query executed successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error); // Log the full error object
    }
};

// Test the connection when the server starts
checkDatabaseConnection();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/home`);
});
