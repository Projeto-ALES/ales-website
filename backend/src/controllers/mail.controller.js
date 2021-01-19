const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const MailService = require("../services/mail.service");
const { handleError } = require("../helpers/error");

router.post(
  "/",
  [
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("email").not().isEmpty().withMessage("Email is missing"),
    check("message").not().isEmpty().withMessage("Message is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { name, email, message } = req.body;
      const { EMAIL_FROM } = process.env;

      await MailService.sendEmail({
        from: email,
        to: EMAIL_FROM,
        subject: "[ALES] Mensagem do Site",
        text: `${name} - ${email} enviou a seguinte mensagem: ${message}`,
      });
      return res.status(200).json({
        status: 200,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;
