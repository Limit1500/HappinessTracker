import usersController from "../controllers/usersController.js";
import { Router } from "express";

export let usersRouter = Router();

usersRouter.get("/:userId", usersController.getUserById);
usersRouter.get("/", usersController.getAllUsers);
usersRouter.post("/", usersController.postUser);
usersRouter.delete("/:userId", usersController.deleteUserById);
usersRouter.patch("/:userId", usersController.patchUser);
