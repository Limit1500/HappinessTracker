import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/errorTypes.js";

const errorHandler = {
  handleError(err: any, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof CustomError) {
      /* console.error(err); */
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default errorHandler;
