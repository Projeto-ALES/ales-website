const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const ProfessorService = require("../services/professor.service");
const { handleError } = require("../helpers/error");

router.get("/professors", async (req, res) => {
  try {
    const professors = await ProfessorService.getProfessors({});
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
    check("email").not().isEmpty().withMessage("Email is missing"),
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("password").not().isEmpty().withMessage("Password is missing"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 chars long"),
    check("phone").not().isEmpty().withMessage("Phone is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const professor = await ProfessorService.createProfessor(req.body);
      professor.password = null;
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
    const { id } = req.params;
    const professor = await ProfessorService.getProfessor(id);
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

module.exports = router;
