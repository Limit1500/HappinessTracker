import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const authMiddleware = {
  checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!req.cookies.token) {
        throw new Error("Token missing");
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
