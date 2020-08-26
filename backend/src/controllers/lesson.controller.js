const express = require("express");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const LessonService = require("../services/lesson.service");

const { BadRequestError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Lesson";

router.get("/lessons",
  AuthMiddleware,
  async (req, res) => {
  const subjects = await SubjectService.getSubjects({});
  return res.status(200).json({
    status: 200,
    subjects,
  });
});

router.post("/lessons",
  AuthMiddleware,
  [
    check("name").not().isEmpty().withMessage("Lesson name is missing"),
    check("subject").not().isEmpty().withMessage("Subject is missing"),
    check("date").not().isEmpty().withMessage("Date is missing"),
  ],
  async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new BadRequestError())
    };

  const lesson = await LessonService.createLesson(req.body);

  return res.status(201).json({
    status: 201,
    lesson,
  });
});

module.exports = router;
