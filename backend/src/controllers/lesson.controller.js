const express = require("express");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const LessonService = require("../services/lesson.service");

const { NotFoundError, handleError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Lesson";

router.get("/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await LessonService.getLessonById(id);

    if (!lesson) {
      throw new NotFoundError(ENTITY_NAME);
    };

    return res.status(200).json({
      status: 200,
      lesson,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put("/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await LessonService.updateLesson(id, req.body);

    if (!lesson) {
      throw new NotFoundError(ENTITY_NAME);
    }

    return res.status(200).json({
      status: 200,
    });
  } catch (e) {
    handleError(e, res);
  }
});


router.delete("/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await LessonService.deleteLesson(id);

    if (!lesson) {
      throw new NotFoundError(ENTITY_NAME);
    }

    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
