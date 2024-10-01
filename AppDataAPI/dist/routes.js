import { checkUserData, findUser, insertUser } from "./queries.js";
import { Router } from "express";
export let router = Router();
router.post("/signin", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    try {
        await checkUserData(username, email, password);
    }
    catch (error) {
        res.status(400).send(error.message);
        return;
    }
    try {
        await insertUser(username, email, password);
    }
    catch (error) {
        res.status(500).send(error.message);
        return;
    }
    res.status(200).send("You have been registered");
});
router.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = "";
    try {
        email = await findUser(username, password);
    }
    catch (error) {
        res.status(400).send(error.message);
        return;
    }
    const response = {
        message: "You are logged in",
        email: email,
    };
    res.status(200).json(response);
});
