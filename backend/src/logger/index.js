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
  },
  error: {
    level: "error",
    filename: "logs/error.log",
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    handleExceptions: false,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
}

const logger = expressWinston.logger({
  transports: [
    new winston.transports.File(option.combined),
    new winston.transports.Console(option.console),
  ],
  dumpExceptions: true,
  showStack: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File(option.error),
  ],
});

module.exports = {
  logger,
  errorLogger,
};
