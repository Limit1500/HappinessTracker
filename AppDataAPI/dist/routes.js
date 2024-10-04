import { checkUserData, findUser, insertUser } from "./queries.js";
import { Router } from "express";
export let router = Router();
router.post("/signin", async (req, res) => {
    try {
        await checkUserData(req.body.username, req.body.email, req.body.password);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    let response;
    try {
        response = await insertUser(req.body.username, req.body.email, req.body.password);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(200).json(response);
});
router.post("/login", async (req, res) => {
    let response;
    try {
        response = await findUser(req.body.username, req.body.password);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    res.status(200).json(response);
});
