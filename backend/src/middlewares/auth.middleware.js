const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../helpers/error");
const { parseCookie } = require("../helpers/cookie");

const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

exports.verifyAuth = async cookie => {
  if (!cookie) {
    throw new ErrorHandler(401, "Access token is missing");
  }

  const parsedCookies = await parseCookie(cookie);
  const token = parsedCookies["token"];
  if (!token) {
    throw new ErrorHandler(401, "Access token is invalid or missing");
  }

  const data = jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, err.message);
    }
    return decoded;
  });

  return { token, data };
};

exports.verifyRefreshToken = async cookie => {
  if (!cookie) {
    throw new ErrorHandler(401, "Refresh token is missing");
  }

  const parsedCookies = await parseCookie(cookie);
  const refreshToken = parsedCookies["refresh_token"];
  if (!refreshToken) {
    throw new ErrorHandler(401, "Refresh token is invalid or missing");
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, err.message);
    }
  });

  return refreshToken;
};
