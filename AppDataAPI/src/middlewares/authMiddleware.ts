import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/usersTypes.js";

const authMiddleware = {
  checkToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error("Token missing");
      }

      const tokenPayload = jwt.verify(token, "Secret Key");
      req.user = tokenPayload;

      next();
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  },
};

export default authMiddleware;
