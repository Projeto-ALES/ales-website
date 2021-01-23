const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");

const UserService = require("../services/user.service");
const ProfessorService = require("../services/professor.service");
const MailService = require("../services/mail.service");

const { handleError, ErrorHandler } = require("../helpers/error");
const { professorStatus } = require("../helpers/status");

router.get("/", AuthMiddleware, async (req, res) => {
  try {
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
  "/",
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
    check("password_conf", "Password and its confirmation don't match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("phone").not().isEmpty().withMessage("Phone is required"),
    check("inviteToken").not().isEmpty().withMessage("Invite token is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { inviteToken } = req.body;

      let professor = await ProfessorService.getProfessorWithToken({ inviteToken });
      if (!professor) {
        throw new ErrorHandler(400, "Invalid token");
      }

      if (Date.parse(professor.inviteTokenExp) < Date.now()) {
        throw new ErrorHandler(400, "The invite token has expired");
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

router.get("/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await ProfessorService.getProfessor({ _id: id });

    if (!professor) {
      throw new ErrorHandler(404, "Professor not found");
    }

    return res.status(200).json({
      status: 200,
      professor,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
  try {
    const professor = await ProfessorService.deleteProfessor(req.params.id);
    if (!professor) {
      throw new ErrorHandler(404, "Professor not found");
    }

    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put(
  "/:id",
  AuthMiddleware,
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
      const { id } = req.params;
      const { token } = req.authContext;
      if (!UserService.isOwner(id, token)) {
        throw new ErrorHandler(403, "Permission denied");
      }

      const professor = await ProfessorService.updateProfessor(id, req.body);
      if (!professor) {
        throw new ErrorHandler(404, "Professor not found");
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
  "/invite",
  AuthMiddleware,
  [check("email").not().isEmpty().withMessage("Email is missing")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { email } = req.body;
      const inviteToken = crypto.randomBytes(20).toString("hex");
      const inviteTokenExp = Date.now() + 3600000;

      const professor = await ProfessorService.getProfessor({ email });
      if (professor) {
        if (professor.status === professorStatus.INVITED) {
          await ProfessorService.updateProfessor(professor._id, {
            inviteToken,
            inviteTokenExp,
          });
        } else {
          throw new ErrorHandler(409, "Professor already registered");
        }
      } else {
        await ProfessorService.createProfessor({
          email,
          status: professorStatus.INVITED,
          inviteToken,
          inviteTokenExp,
        });
      }

      const { EMAIL_FROM, DOMAIN, NODE_ENV } = process.env;
      let processing;
      if (NODE_ENV !== "test") {
        processing = await MailService.sendEmail({
          from: EMAIL_FROM,
          to: email,
          subject: "[ALES] Convite",
          html: `<span>Olá! Você foi convidado para ter acesso ao site do ALES!</span><br><span>Acesse <a href="${DOMAIN}/professors/enroll/${inviteToken}" target="_blank">este link</a> para completar seu cadastro.</span>`,
        });
      }

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
