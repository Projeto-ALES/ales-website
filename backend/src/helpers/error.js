const { clearCookies } = require("../helpers/cookie");

class ErrorHandler extends Error {
  constructor(status, message, jwtExpired = false) {
    super();
    this.status = status;
    this.message = message;
    this.jwtExpired = jwtExpired;
  }
}

class NotFoundError extends ErrorHandler {
  constructor(entityName) {
    super(404, `${entityName} not found`);
  };
};

class BadRequestError extends ErrorHandler {
  constructor(message) {
    super(400, message);
  };
};

const handleError = async (err, res) => {
  const { status, message, jwtExpired } = err;
  if (status === 401 && jwtExpired) {
    await clearCookies(res);
  }
  res.status(status || 500).json({
    status,
    message,
  });
};

module.exports = {
  ErrorHandler,
  NotFoundError,
  BadRequestError,
  handleError,
};
