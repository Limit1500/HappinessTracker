import { pool } from "./server.js";
import { Router } from "express";
export let router = Router();
router.post("/signin", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    pool
        .query("INSERT INTO users ( username, password, email ) VALUES ( $1, $2, $3 )", [username, password, email])
        .then(() => {
        res.send("request sucessfull").status(200);
    })
        .catch(() => {
        res.send("a error ocured").status(500);
    });
});
