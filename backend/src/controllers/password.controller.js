const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");

const AuthService = require("../services/auth.service");
const MailService = require("../services/mail.service");

const { handleError, BadRequestError, NotFoundError } = require("../helpers/error");

router.post(
  "/update/:id",
  AuthMiddleware,
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const { id } = req.params;
      const { password, new_password, new_password_conf } = req.body;

      const user = await AuthService.getUserWithPassword({ _id: id });
      if (!user) {
        throw new NotFoundError("User");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequestError("Invalid password");
      }

      if (new_password !== new_password_conf) {
        throw new BadRequestError("New password and its confirmation are different");
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
  "/reset",
  [check("email").not().isEmpty().withMessage("Email is missing")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const { email } = req.body;
      const user = await AuthService.getUserWithPasswordToken({ email });
      if (!user) {
        throw new NotFoundError("User");
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.passwordToken = token;
      user.passwordTokenExp = Date.now() + 3600000;
      user.save();

      const { EMAIL_FROM, DOMAIN } = process.env;
      const processing = await MailService.sendEmail({
        from: EMAIL_FROM,
        to: email,
        subject: "[ALES] Reset da senha",
        html: `<span>Olá! Você solicitou o cadastro de uma nova senha</span><br><span>Acesse <a href="${DOMAIN}/new-password/${token}" target="_blank">este link</a> para cadastrar uma nova.</span>`,
      });
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
  "/new",
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const { token, new_password, new_password_conf } = req.body;
      if (new_password !== new_password_conf) {
        throw new BadRequestError("New password and its confirmation are different");
      }

      const user = await AuthService.getUserWithPasswordToken({
        passwordToken: token,
      });
      if (!user) {
        throw new NotFoundError("User");
      }
      if (Date.parse(user.passwordTokenExp) < Date.now()) {
        throw new BadRequestError("The given token has expired");
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
