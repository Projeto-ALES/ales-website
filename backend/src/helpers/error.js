class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { status, message } = err;
  res.status(status).json({
    status,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
