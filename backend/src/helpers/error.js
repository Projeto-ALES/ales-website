const { clearCookies } = require("../helpers/cookie");

class ErrorHandler extends Error {
  constructor(status, message, jwtExpired = false) {
    super();
    this.status = status;
    this.message = message;
    this.jwtExpired = jwtExpired;
  }
}

const handleError = async (err, res) => {
  const { status, message, jwtExpired } = err;
  if (status === 401 && jwtExpired) {
    await clearCookies(res);
  }
  res.status(status).json({
    status,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
