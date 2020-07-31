const winston = require("winston");
const expressWinston = require("express-winston");

const option = {
  combined: {
    level: "info",
    filename: "logs/combined.log",
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    handleExceptions: false,
    colorize: false,
    timestamp: true,
  },
  error: {
    level: "error",
    filename: "logs/error.log",
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    handleExceptions: false,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
  },
};

const logFormat = winston.format.printf(({ message, timestamp, level }) => {
  return `${timestamp} ${level}: ${message}`;
});

const errorFormat = winston.format.printf(
  ({ message, timestamp, level, meta }) => {
    return `${timestamp} ${level} ${message} : ${meta.stack}`;
  }
);

const logger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File(option.combined),
    new winston.transports.Console(option.console),
  ],
  dumpExceptions: true,
  showStack: true,
});

const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    errorFormat
  ),
  transports: [new winston.transports.File(option.error)],
});

module.exports = {
  logger,
  errorLogger,
};
