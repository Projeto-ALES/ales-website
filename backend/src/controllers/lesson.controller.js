const express = require("express");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const LessonService = require("../services/lesson.service");

const { NotFoundError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Lesson";

router.get("/:id", AuthMiddleware, async (req, res, next) => {
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

router.put("/:id", AuthMiddleware, async (req, res, next) => {

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


router.delete("/:id", AuthMiddleware, async (req, res, next) => {
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
