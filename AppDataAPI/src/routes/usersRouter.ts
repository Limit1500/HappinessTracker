import usersController from "../controllers/usersController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import registerInputValidation from "../middlewares/registerInputValidationMiddleware.js";

export let usersRouter = Router();
usersRouter.post(
  "/logIn",
  registerInputValidation.validateSignIn,
  usersController.logIn
);
usersRouter.post(
  "/signIn",
  registerInputValidation.validateLogIn,
  usersController.signIn
);
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
