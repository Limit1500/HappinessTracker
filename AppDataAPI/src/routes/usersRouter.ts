import usersController from "../controllers/usersController.js";
import { Router } from "express";

export let usersRouter = Router();

usersRouter.get("/:userId", usersController.logIn);
usersRouter.post("/", usersController.signIn);
usersRouter.delete("/", usersController.deleteUser);
usersRouter.patch("/", usersController.editUserData);
