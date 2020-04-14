import express, { urlencoded } from "express";

const bodyParser = require("body-parser");

const app = express();
const port = 8000;

const userController = require("./src/controllers/userController");

app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("projeto ales");
});

userController(app);

app.listen(port);
