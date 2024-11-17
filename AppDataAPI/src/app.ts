import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/usersRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorMiddleware.js";

export const app = express();

dotenv.config();

// app middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routers
app.use("/users", usersRouter);

// error handler
app.use(errorHandler.handleError);
