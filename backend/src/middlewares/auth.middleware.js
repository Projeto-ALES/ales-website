const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../helpers/error");

const { TOKEN_SECRET } = process.env;

exports.verifyAuth = async cookie => {
  if (!cookie) {
    throw new ErrorHandler(401, "Access token is missing");
  }
  const rawCookies = cookie.split(";");
  const parsedCookies = {};

  rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0].trim()] = parsedCookie[1];
  });

  const token = parsedCookies["token"];
  const refreshToken = parsedCookies["refresh_token"];

  if (!token) {
    throw new ErrorHandler(401, "Access token is invalid or missing");
  }

  const data = jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, err.message);
    }
    return decoded;
  });

  return { token, refreshToken, data };
};
