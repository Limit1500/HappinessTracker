import { error } from "console";
import usersService from "../services/usersService.js";
import { Request, Response } from "express";

const usersController = {
  async logIn(req: Request, res: Response) {
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
      if ((error as Error).message === "Invalid data") {
        res.status(400).json({ message: "Invalid data" });
      }
      res.status(500).json({ message: "Internal error" });
    }
  },
  async signIn(req: Request, res: Response) {
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
    try {
    } catch (error) {
      if ((error as Error).message == "Invalid data") {
        res.status(400).json({ message: "Invalid data" });
      }
      res.status(500).json({ message: "Internal error" });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      await usersService.deleteUser(res.locals.payload.tokenPayload);

      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
  async logOut(req: Request, res: Response) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "LogOut successfull" });
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
  async editUserData(req: Request, res: Response) {
    try {
      await usersService.editUserData(
        req.body.username,
        req.body.password,
        req.body.email,
        res.locals.payload.tokenPayload
      );
      res.status(200).json({ message: "Data edited successfuly" });
    } catch (error) {
      if ((error as Error).message == "Invalid data") {
        res.status(400).json({ message: "Invalid data" });
      } else if ((error as Error).message == "No changes made") {
        res.status(400).json({ message: "No changes made" });
      } else {
        res.status(500).json({ message: "Internal error" });
      }
    }
  },
};

export default usersController;
