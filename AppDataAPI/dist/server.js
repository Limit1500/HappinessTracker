import express from "express";
import pkg from "pg";
import { router } from "./routes.js";
import cors from "cors";
const { Pool } = pkg;
export const PORT = 4000;
export const server = express();
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "D_QWERTY_T9",
    port: 5432,
});
server.use(express.json());
server.use(cors());
server.use("/", router);
server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});
