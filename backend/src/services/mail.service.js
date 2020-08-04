const nodemailer = require("nodemailer");
const fs = require("fs");

const { ErrorHandler } = require("../helpers/error");
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, NODE_ENV } = process.env;
let { EMAIL_PASSWORD } = process.env;

if (NODE_ENV === "production") {
  EMAIL_PASSWORD = fs.readFileSync(EMAIL_PASSWORD, "utf-8");
}

exports.sendEmail = async mail => {
  try {
    const transporter = await nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD.trim(),
      },
    });

    return await transporter.sendMail(mail);
  } catch (e) {
    throw new ErrorHandler(500, "Error while sending email");
  }
};
