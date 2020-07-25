const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const AuthMiddleware = require("../middlewares/auth.middleware");

const UserService = require("../services/user.service");
const ProfessorService = require("../services/professor.service");

const { handleError } = require("../helpers/error");

router.get("/professors", async (req, res) => {
  try {
    await AuthMiddleware.verifyAuth(req.headers.cookie);

    const professors = await ProfessorService.getProfessors({
      status: "active",
    });
    return res.status(200).json({
      status: 200,
      professors,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post(
  "/professors",
  [
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("password").not().isEmpty().withMessage("Password is missing"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 chars long"),
    check("password_conf")
      .not()
      .isEmpty()
      .withMessage("Password confirmation is missing"),
    check("password_conf")
      .isLength({ min: 5 })
      .withMessage("Password confirmation must have at least 5 chars long"),
    check("phone").not().isEmpty().withMessage("Phone is required"),
    check("inviteToken").not().isEmpty().withMessage("Invite token is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { inviteToken, password, password_conf } = req.body;
      if (password !== password_conf) {
        return res.status(400).json({
          status: 400,
          message: "Password and its confirmation are different",
        });
      }

      let professor = await ProfessorService.getProfessor({ inviteToken });
      if (!professor) {
        return res.status(400).json({
          status: 400,
          message: "Invalid token",
        });
      }

      if (Date.parse(professor.inviteTokenExp) < Date.now()) {
        return res.status(400).json({
          status: 400,
          message: "The invite token has expired",
        });
      }

      professor = await ProfessorService.updateProfessor(professor._id, {
        ...req.body,
        status: "active",
      });

      return res.status(201).json({
        status: 201,
        professor,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.get("/professors/:id", async (req, res) => {
  try {
    await AuthMiddleware.verifyAuth(req.headers.cookie);

    const { id } = req.params;
    const professor = await ProfessorService.getProfessor({ _id: id });
    if (!professor) {
      return res.status(404).json({
        status: 404,
        message: "Professor not found",
      });
    }
    return res.status(200).json({
      status: 200,
      professor,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/professors/:id", async (req, res) => {
  try {
    await AuthMiddleware.verifyAuth(req.headers.cookie);

    const professor = await ProfessorService.deleteProfessor(req.params);
    if (!professor) {
      return res.status(404).json({
        status: 404,
        message: "Professor not found",
      });
    }
    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put(
  "/professors/:id",
  [
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("email").not().isEmpty().withMessage("Email is missing"),
    check("phone").not().isEmpty().withMessage("Phone is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { token } = await AuthMiddleware.verifyAuth(req.headers.cookie);

      const { id } = req.params;
      if (!UserService.isOwner(id, token)) {
        return res.status(403).json({
          status: 403,
          message: "Permission denied",
        });
      }

      const professor = await ProfessorService.updateProfessor(id, req.body);
      if (!professor) {
        return res.status(404).json({
          status: 404,
          message: "Professor not found",
        });
      }
      return res.status(200).json({
        status: 200,
        professor,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.post(
  "/invite-professor",
  [check("email").not().isEmpty().withMessage("Email is missing")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      await AuthMiddleware.verifyAuth(req.headers.cookie);

      const { email } = req.body;
      const inviteToken = crypto.randomBytes(20).toString("hex");
      const inviteTokenExp = Date.now() + 3600000;

      const professor = await ProfessorService.getProfessor({ email });
      if (professor) {
        if (professor.status === "invited") {
          await ProfessorService.updateProfessor(professor._id, {
            inviteToken,
            inviteTokenExp,
          });
        } else {
          return res.status(409).json({
            status: 409,
            message: "Professor already registered",
          });
        }
      } else {
        await ProfessorService.createProfessor({
          email,
          status: "invited",
          inviteToken,
          inviteTokenExp,
        });
      }

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
        subject: "Invite from Projeto ALES",
        text: `Access http://localhost:3000/professors/enroll/${inviteToken}`,
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

module.exports = router;
