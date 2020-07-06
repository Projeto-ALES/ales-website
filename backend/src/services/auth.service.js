const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const jwtConfig = require("../jwt");

exports.getToken = async data => {
  try {
    const { email, password } = data;
    if (!email || !password) {
      throw Error("Bad request");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw Error("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw Error("Invalid password");
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

    return {
      user: {
        name: user.name,
        email,
        roles: user.roles,
        createdAt: user.createdAt,
      },
      token,
      refreshToken,
    };
  } catch (err) {
    throw Error(err.message);
  }
};

exports.refreshToken = async data => {
  try {
    const refreshToken = data.split(" ")[1];
    if (!refreshToken) {
      throw Error("Bad request");
    }

    const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const { email, roles, name } = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    const token = jwt.sign({ email, roles, name }, TOKEN_SECRET, {
      expiresIn: jwtConfig.token_exp,
    });
    return { token };
  } catch (err) {
    throw Error(err.message);
  }
};
