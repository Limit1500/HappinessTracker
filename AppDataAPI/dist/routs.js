import { pool } from "./server.js";
import { Router } from "express";
export let router = Router();
router.get("/signin", (req, res) => {
    let username = req.body.username;
    let password = req.body.username;
    let email = req.body.email;
    pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [username, password, email]);
});
