const express = require("express");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const CourseService = require("../services/course.service");
const LessonService = require("../services/lesson.service");

const { BadRequestError, NotFoundError, handleError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Lesson";

router.post("/:id/lessons",
  [
    check("title").not().isEmpty().withMessage("Lesson name is missing"),
  ],
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()))
    };

    try {
      const lesson = await LessonService.createLesson(req.body);
      const course = await CourseService.addLesson(req.params.id, lesson._id);

      return res.status(201).json({
        status: 201,
        course,
      });
    } catch (e) {
      handleError(e, res);
    }
  });

router.get("/lessons/:id", AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;

  const lesson = await LessonService.getLessonById(id);

  if (!lesson) {
    return next(new NotFoundError(ENTITY_NAME));
  };

  return res.status(200).json({
    status: 200,
    lesson,
  });
});

router.put("/lessons/:id", AuthMiddleware, async (req, res, next) => {

  try {
    const { id } = req.params;
    const lesson = await LessonService.updateLesson(id, req.body);

    if (!lesson) {
      return next(new NotFoundError(ENTITY_NAME));
    }

  } catch (e) {
    return next(e);
  };

  return res.status(200).json({
    status: 200,
  });
})


router.delete("/lessons/:id", AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;

  const lesson = await LessonService.deleteLesson(id);

  if (!lesson) {
    return next(new NotFoundError(ENTITY_NAME));
  }

  return res.status(202).json({
    status: 202,
  });
})

module.exports = router;
