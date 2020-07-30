const express = require("express");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDb = require("./src/mongo");

// controllers
const userRouter = require("./src/controllers/user.controller");
const professorRouter = require("./src/controllers/professor.controller");
const authRouter = require("./src/controllers/auth.controller");
const passwordRouter = require("./src/controllers/password.controller");
const mailRouter = require("./src/controllers/mail.controller");

const { handleError } = require("./src/helpers/error");

const app = express();

const { UI_URL, PORT } = process.env;
const port = PORT;
const basePath = "/api";

app.use(cors({ credentials: true, origin: UI_URL }));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});

app.use(limiter);

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
app.use(basePath, mailRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port);
