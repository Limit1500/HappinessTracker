import express from "express";
import { router } from "./routes.js";
import cors from "cors";
import { checkDatabaseConnection } from "./userQueries.js";
export const PORT = 4000;
export const server = express();
server.use(express.json());
server.use(cors());
server.use("/", router);
server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
    checkDatabaseConnection();
});
