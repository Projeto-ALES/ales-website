const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AuthService = require("../services/auth.service");
const { handleError } = require("../helpers/error");
const jwtConfig = require("../jwt");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }
    const user = await AuthService.getUserWithPassword({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const token = jwt.sign(
      { email: user.email, roles: user.roles, name: user.name },
      TOKEN_SECRET,
      {
        expiresIn: jwtConfig.TOKEN_EXP,
      }
    );
    const refreshToken = jwt.sign(
      { email: user.email, roles: user.roles, name: user.name },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: jwtConfig.REFRESH_TOKEN_EXP,
      }
    );

    user.password = null;
    return res
      .cookie("token", token, { httpOnly: false })
      .cookie("refresh_token", refreshToken, { httpOnly: false })
      .status(200)
      .json({
        status: 200,
        user,
      });
  } catch (e) {
    handleError(e, res);
  }
});

router.post("/refresh-token", (req, res) => {
  try {
    const { cookie } = req.headers;
    const rawCookies = cookie.split(";");
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
      const parsedCookie = rawCookie.split("=");
      parsedCookies[parsedCookie[0].trim()] = parsedCookie[1];
    });

    const refresh_token = parsedCookies["refresh_token"];
    if (!refresh_token) {
      return res.status(400).json({
        status: 400,
        message: "Invalid refresh token",
      });
    }

    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const { email, roles, name } = jwt.verify(
      refresh_token,
      REFRESH_TOKEN_SECRET
    );
    const token = jwt.sign({ email, roles, name }, TOKEN_SECRET, {
      expiresIn: jwtConfig.TOKEN_EXP,
    });

    return res.cookie("token", token, { httpOnly: false }).status(200).json({
      status: 200,
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
