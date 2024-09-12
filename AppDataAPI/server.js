import express from "express";

const app = express();
const PORT = 4200;

app.use(express.json());

app.get("/home", (req, res) => {
    res.send("You are in the home page <br></br> You can make a post request at /post <br></br> Or you can make a patch request at /patch");
})

app.post('/post', (req, res) => {
    res.json(req.body);
})

let text = '-blank-'

app.patch("/patch", (req, res) => {
    text = req.body.text;
    res.send(`the text is now: ${text}`);  // Responds to GET requests to /patch
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/home`);
})