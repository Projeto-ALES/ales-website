const express = require("express");
var cors = require("cors");
const connectDb = require("./src/mongo");

// controllers
const userRouter = require("./src/controllers/user.controller");
const professorRouter = require("./src/controllers/professor.controller");
const authRouter = require("./src/controllers/auth.controller");
const passwordRouter = require("./src/controllers/password.controller");

const { handleError } = require("./src/helpers/error");

const app = express();
const port = 8000;
const basePath = "/api";
const { UI_URL } = process.env;

app.use(cors({ credentials: true, origin: UI_URL }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

connectDb().then(() => {
  console.log("Database connected");
});

app.get(`${basePath}/ping`, (req, res) => {
  res.send("pong");
});

app.use(basePath, userRouter);
app.use(basePath, professorRouter);
app.use(basePath, authRouter);
app.use(basePath, passwordRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port);
