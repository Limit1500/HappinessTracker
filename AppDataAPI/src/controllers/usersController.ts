import { error } from "console";
import usersService from "../services/usersService.js";
import { NextFunction, Request, Response } from "express";

const usersController = {
  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await usersService.logIn(
        req.body.username,
        req.body.password
      );

      res.cookie("token", response, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000 * 24 * 7,
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      next(error);
    }
  },
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await usersService.signIn(
        req.body.username,
        req.body.password,
        req.body.email
      );

      res.cookie("token", response, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000 * 24 * 7,
      });

      res.status(200).json({ message: "Signin successfull" });
    } catch (error) {
      next(error);
    }
  },
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.deleteUser(res.locals.payload.tokenPayload);

      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  },
  async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({ message: "LogOut successfull" });
    } catch (error) {
      next(error);
    }
  },
  async editUserData(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.editUserData(
        req.body.username,
        req.body.password,
        req.body.email,
        res.locals.payload.tokenPayload
      );

      res.status(200).json({ message: "Data edited successfuly" });
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
