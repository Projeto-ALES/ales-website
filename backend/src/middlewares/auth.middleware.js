const jwt = require("jsonwebtoken");

const { parseCookie } = require("../helpers/cookie");

const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

exports.AuthMiddleware = async (req, res, next) => {
  const { headers } = req;

  const cookie = headers ? headers.cookie : null;

  if (!cookie) {
    return res
      .status(401)
      .send({ status: 401, message: "Access token is missing" });
  }

  const parsedCookies = await parseCookie(cookie);
  const token = parsedCookies["token"];
  if (!token) {
    return res
      .status(401)
      .send({ status: 401, message: "Access token is invalid or missing" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ status: 401, message: err.message });
    }
    req.authContext = {
      token,
      data: decoded,
    };

    next();
  });
};

exports.VerifyRefreshToken = async (req, res, next) => {
  const { headers } = req;

  const cookie = headers ? headers.cookie : null;

  if (!cookie) {
    return res
      .status(401)
      .send({ status: 401, message: "Refresh token is missing" });
  }

  const parsedCookies = await parseCookie(cookie);
  const refreshToken = parsedCookies["refresh_token"];
  if (!refreshToken) {
    return res
      .status(401)
      .send({ status: 401, message: "Refresh token is invalid or missing" });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ status: 401, message: err.message });
    }
    req.authContext = {
      refreshToken,
    };

    next();
  });
};
