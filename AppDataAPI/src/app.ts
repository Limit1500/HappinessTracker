import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/usersRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

export const app = express();

dotenv.config();

// app middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routers
app.use("/users", usersRouter);
