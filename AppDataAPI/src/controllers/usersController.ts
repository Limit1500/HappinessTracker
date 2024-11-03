import { error } from "console";
import usersService from "../services/usersService.js";
import { Request, Response } from "express";
import { QueryResult } from "pg";

const usersController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const response = await usersService.getAllUsers();

      if (!response || response.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "User not found" });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const response = await usersService.getUserById(
        Number(req.params.userId)
      );

      if (!response || response.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteUserById(req: Request, res: Response) {
    try {
      const response = await usersService.deleteUserById(
        Number(req.params.userId)
      );

      if (response.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  },

  async postUser(req: Request, res: Response) {
    try {
      const response = await usersService.postUser(req.body.userData);

      if (response.rowCount === 0) {
        return res.status(404).json({ message: "Invalid data" });
      }

      return res.status(200).json({ message: "User posted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  },

  async patchUser(req: Request, res: Response) {
    try {
      const response = await usersService.patchUser(req.body.userData);

      if (response.rowCount === 0) {
        return res.status(404).json({ message: "Invalid data" });
      }

      return res.status(200).json({ message: "User patched" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  },
};

export default usersController;
