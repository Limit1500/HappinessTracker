import usersController from "../controllers/usersController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

export let usersRouter = Router();

usersRouter.post("/logIn", usersController.logIn);
usersRouter.post("/signIn", usersController.signIn);
usersRouter.post(
  "/editUserData",
  authMiddleware.checkToken,
  usersController.editUserData
);

usersRouter.get("/logOut", authMiddleware.checkToken, usersController.logOut);
usersRouter.get(
  "/deleteUser",
  authMiddleware.checkToken,
  usersController.deleteUser
);
