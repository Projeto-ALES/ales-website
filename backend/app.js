const express = require("express");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDb = require("./src/mongo");

const { logger, errorLogger } = require("./src/logger");

// controllers
const userRouter = require("./src/controllers/user.controller");
const professorRouter = require("./src/controllers/professor.controller");
const authRouter = require("./src/controllers/auth.controller");
const passwordRouter = require("./src/controllers/password.controller");
const mailRouter = require("./src/controllers/mail.controller");
const subjectRouter = require("./src/controllers/subject.controller");
const lessonRouter = require("./src/controllers/lesson.controller");

const { handleError } = require("./src/helpers/error");

const app = express();

const { UI_URL, PORT } = process.env;
const port = PORT;
const basePath = "/api";

app.use(logger);

app.use(cors({ credentials: true, origin: UI_URL }));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});

app.use(limiter);

connectDb();

app.get(`${basePath}/ping`, (req, res) => {
  res.send("pong");
});

const routers = [
  userRouter,
  professorRouter,
  authRouter,
  passwordRouter,
  mailRouter,
  subjectRouter,
  lessonRouter,
];

routers.forEach(router => app.use(basePath, router));

app.use(errorLogger);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port);
