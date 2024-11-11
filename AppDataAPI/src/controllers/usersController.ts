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

      if (!response || response.lenght !== 1) {
        return res.status(400).json({ message: "Invalid input" });
      }

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
  async signIn(req: Request, res: Response) {
    try {
      const response = await usersService.signIn(
        req.body.username,
        req.body.password,
        req.body.email
      );

      if (!response || response.lenght !== 1) {
        return res.status(400).json({ message: "Invalid input" });
      }

      res.status(200).json({ message: "Signin successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const response = await usersService.deleteUser(req.body.id);

      if (!response || response.lenght !== 1) {
        return res.status(400).json({ message: "Invalid input" });
      }

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
  async editUserData(req: Request, res: Response) {
    try {
      const response = await usersService.editUserData(
        req.body.username,
        req.body.password,
        req.body.email
      );

      if (!response || response.lenght !== 1) {
        return res.status(400).json({ message: "Invalid Input" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal error" });
    }
  },
};

export default usersController;
