import express, { urlencoded } from "express";

import userController from "./src/controllers/userController";

const app = express();
const port = 8000;

app.use(urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

userController(app);

app.listen(port);
