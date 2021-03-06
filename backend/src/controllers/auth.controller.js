const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware, VerifyRefreshToken } = require("../middlewares/auth.middleware");

const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");

const { handleError, ErrorHandler, BadRequestError } = require("../helpers/error");
const { clearCookies } = require("../helpers/cookie");
const jwtConfig = require("../jwt");

router.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("Email is missing"),
    check("password").not().isEmpty().withMessage("Password is missing"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const { email, password } = req.body;
      const user = await AuthService.getUserWithPassword({ email });
      if (!user) {
        throw new ErrorHandler(401, "Invalid credentials");
      }

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        throw new ErrorHandler(401, "Invalid credentials");
      }
      const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        TOKEN_SECRET,
        {
          expiresIn: jwtConfig.TOKEN_EXP,
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: jwtConfig.REFRESH_TOKEN_EXP,
        }
      );
      user.password = null;
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: NODE_ENV === "production",
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
        })
        .status(200)
        .json({
          status: 200,
          user,
        });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.post("/refresh-token", VerifyRefreshToken, async (req, res) => {
  const { refreshToken } = req.authContext;

  const { TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

  const { id, email, name } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const token = jwt.sign({ id, email, name }, TOKEN_SECRET, {
    expiresIn: jwtConfig.TOKEN_EXP,
  });

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
    })
    .status(200)
    .json({
      status: 200,
    });
});

router.post("/logout", async (req, res) => {
  await clearCookies(res);
  res.status(202).json({ status: 202 });
});

router.get("/me", AuthMiddleware, async (req, res) => {
  try {
    const { data } = req.authContext;
    const { id } = data;
    const user = await UserService.getUser(id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    const { _id, name, email } = user;
    return res.status(200).json({
      status: 200,
      user: {
        _id,
        name,
        email,
      },
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
