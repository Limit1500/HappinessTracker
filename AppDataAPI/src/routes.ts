import { checkUserData, insertUser } from "./queries.js";
import { pool } from "./server.js";
import { Router } from "express";

export let router = Router();

router.post("/signin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  try {
    await checkUserData(username, email, password);
  } catch (error) {
    res.status(400).send((error as Error).message);
    return;
  }

  try {
    await insertUser(username, email, password);
  } catch (error) {
    res.status(500).send((error as Error).message);
    return;
  }

  res.status(200).send("You have been registered");
});
