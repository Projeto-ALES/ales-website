const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AuthService = require("../services/auth.service");
const { handleError } = require("../helpers/error");
const jwtConfig = require("../jwt");

exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }
    const user = await AuthService.getUserWithPassword(email);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
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
    return res.status(200).json({
      status: 200,
      user,
      token,
      refreshToken,
    });
  } catch (e) {
    handleError(e, res);
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization.split(" ")[1];
    if (!refreshToken) {
      return res.status(400).json({
        status: 400,
        message: "Invalid refresh token",
      });
    }

    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const { email, roles, name } = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    const token = jwt.sign({ email, roles, name }, TOKEN_SECRET, {
      expiresIn: jwtConfig.TOKEN_EXP,
    });
    return res.status(200).json({
      status: 200,
      token,
    });
  } catch (e) {
    handleError(e, res);
  }
};
