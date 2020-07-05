import express, { urlencoded } from "express";

const connectDb = require("./src/mongo");

import userController from "./src/controllers/userController";

const app = express();
const port = 8000;

app.use(urlencoded({ extended: false }));

connectDb().then(() => {
  console.log("Database connected");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

userController(app);

app.listen(port);
