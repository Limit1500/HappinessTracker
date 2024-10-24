import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/usersRouter.js";

export const app = express();

// app middleware
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
