const express = require("express");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const LessonService = require("../services/lesson.service");

const { BadRequestError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Lesson";

router.post("/lessons",
  [
    check("name").not().isEmpty().withMessage("Lesson name is missing"),
    check("subject").not().isEmpty().withMessage("Subject is missing"),
    check("date").not().isEmpty().withMessage("Date is missing"),
  ],
  async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new BadRequestError(errors.array()))
    };

  const lesson = await LessonService.createLesson(req.body);

  return res.status(201).json({
    status: 201,
    lesson,
  });
});

router.put("/lessons/:id", AuthMiddleware, async (req, res, next) => {

  try {
    const { id } = req.params;
    await LessonService.updateLesson(id, req.body);
  } catch(e) {
    next(e);
  };

  return res.status(201).json({
    status: 200,
  });
})


router.delete("/lessons/:id", AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;

  const lesson = await LessonService.deleteLesson(id);

  if (!lesson) {
    next (new NotFoundError(ENTITY_NAME));
  }

  return res.status(202).json({
    status: 202,
  });
})

module.exports = router;
