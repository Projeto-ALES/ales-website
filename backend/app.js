const express = require("express");
var cors = require("cors");
const connectDb = require("./src/mongo");

// controllers
const userController = require("./src/controllers/user.controller");
const professorController = require("./src/controllers/professor.controller");
const authController = require("./src/controllers/auth.controller");
const passwordController = require("./src/controllers/password.controller");

const { handleError } = require("./src/helpers/error");

const app = express();
const port = 8000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

connectDb().then(() => {
  console.log("Database connected");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/", userController);
app.use("/", professorController);
app.use("/", authController);
app.use("/", passwordController);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port);
