const express = require("express");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDb = require("./src/mongo");

const { logger, errorLogger } = require("./src/logger");

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

app.use(basePath, require("./src/controllers"));

app.use(errorLogger);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port);
