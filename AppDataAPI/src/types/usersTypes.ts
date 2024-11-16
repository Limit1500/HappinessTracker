import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface userData {
  username: string;
  password: string;
  email: string;
}
