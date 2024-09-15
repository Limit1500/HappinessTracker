import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
const PORT = 4200;
const server = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'D_QWERTY_T9',
    port: 5432
});
server.use(express.json());
server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}/home`);
});
server.get('/home', (req, res) => {
    res.send("hello world!");
});
