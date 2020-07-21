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

module.exports = router;
