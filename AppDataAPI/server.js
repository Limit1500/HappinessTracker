import express from "express";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send("Server has recived your reqest!");
})

app.listen(PORT, () => {
    console.log("serverul este on...");
})