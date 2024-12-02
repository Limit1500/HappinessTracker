import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/errorTypes.js";

const errorHandler = {
  handleError(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);

    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err.message);
      res.status(500).json({ message: "Unexpected error" });
    }
  },
};

export default errorHandler;
