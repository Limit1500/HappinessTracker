import usersController from "../controllers/usersController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import registerInputValidation from "../middlewares/registerInputValidationMiddleware.js";

export const usersRouter = Router();
usersRouter.post(
  "/logIn",
  registerInputValidation.validateLogIn,
  usersController.logIn
);
usersRouter.post(
  "/signIn",
  registerInputValidation.validateSignIn,
  usersController.signIn
);
usersRouter.post(
  "/editUserData",
  authMiddleware.checkToken,
  registerInputValidation.validateSignIn,
  usersController.editUserData
);

usersRouter.get("/logOut", authMiddleware.checkToken, usersController.logOut);
usersRouter.get(
  "/deleteUser",
  authMiddleware.checkToken,
  usersController.deleteUser
);
