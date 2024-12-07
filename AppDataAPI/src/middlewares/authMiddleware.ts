import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/errorTypes.js";

const authMiddleware = {
  checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new CustomError("Token missing", 400);
      }

      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
      res.locals.payload = tokenPayload;
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authMiddleware;
