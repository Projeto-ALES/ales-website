const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const AuthMiddleware = require("../middlewares/auth.middleware");

const AuthService = require("../services/auth.service");
const { handleError } = require("../helpers/error");

router.post(
  "/update-password/:id",
  [
    check("id").not().isEmpty().withMessage("ID is missing"),
    check("password").not().isEmpty().withMessage("Password is missing"),
    check("new_password")
      .not()
      .isEmpty()
      .withMessage("New password is missing"),
    check("new_password")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 chars long"),
    check("new_password_conf")
      .not()
      .isEmpty()
      .withMessage("New password confirmation is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      await AuthMiddleware.verifyAuth(req.headers.cookie);

      const { id } = req.params;
      const { password, new_password, new_password_conf } = req.body;

      const user = await AuthService.getUserWithPassword({ _id: id });
      if (!user) {
        throw new ErrorHandler(404, "User not found");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          status: 401,
          message: "Invalid password",
        });
      }

      if (new_password !== new_password_conf) {
        return res.status(400).json({
          status: 400,
          message: "New password and its confirmation are different",
        });
      }

      user.password = new_password;
      await user.save();
      return res.status(200).json({
        status: 200,
        message: "Password changed",
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.post(
  "/reset-password",
  [check("email").not().isEmpty().withMessage("Email is missing")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      await AuthMiddleware.verifyAuth(req.headers.cookie);

      const { email } = req.body;
      const user = await AuthService.getUserWithPasswordToken({ email });
      if (!user) {
        throw new ErrorHandler(404, "User not found");
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.passwordToken = token;
      user.passwordTokenExp = Date.now() + 3600000;
      user.save();

      const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });

      const mail = {
        from: "projetoales@gmail.com",
        to: email,
        subject: "Reset Password Yeah",
        text: `Access http://localhost:3000/new-password/${token}`,
      };

      const processing = await transporter.sendMail(mail);
      return res.status(200).json({
        status: 200,
        message: "Token generated and successfully sent to the given email",
        processing,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.post(
  "/new-password",
  [
    check("token").not().isEmpty().withMessage("Token is missing"),
    check("new_password")
      .not()
      .isEmpty()
      .withMessage("New password is missing"),
    check("new_password")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 chars long"),
    check("new_password_conf")
      .not()
      .isEmpty()
      .withMessage("New password confirmation is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { token, new_password, new_password_conf } = req.body;
      if (new_password !== new_password_conf) {
        return res.status(400).json({
          status: 400,
          message: "New password and its confirmation are different",
        });
      }

      const user = await AuthService.getUserWithPasswordToken({
        passwordToken: token,
      });
      if (!user) {
        throw new ErrorHandler(404, "User not found");
      }

      if (Date.parse(user.passwordTokenExp) < Date.now()) {
        return res.status(400).json({
          status: 400,
          message: "The given token has expired",
        });
      }

      user.password = new_password;
      await user.save();
      return res.status(200).json({
        status: 200,
        message: "Password changed successfully",
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;
