const nodemailer = require("nodemailer");

const { ErrorHandler } = require("../helpers/error");
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

exports.sendEmail = async mail => {
  try {
    const transporter = await nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    return await transporter.sendMail(mail);
  } catch (e) {
    throw new ErrorHandler(500, "Error while sending email");
  }
};
