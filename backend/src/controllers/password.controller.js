const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const AuthService = require("../services/auth.service");
const { handleError } = require("../helpers/error");

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, new_password, new_password_conf } = req.body;

    if (!id || !password || !new_password || !new_password_conf) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }
    const user = await AuthService.getUserWithPassword({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
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
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }

    const user = await AuthService.getUserWithPasswordToken({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.passwordToken = token;
    user.passwordTokenExp = Date.now() + 3600;
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
      message: "Password changed",
      processing,
    });
  } catch (e) {
    handleError(e, res);
  }
};
