const express = require("express");
const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const SubjectService = require("../services/subject.service");
const LessonService = require("../services/lesson.service");

const { NotFoundError, BadRequestError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Subject";

router.get("/subjects", async (req, res) => {
  const subjects = await SubjectService.getSubjects({});
  return res.status(200).json({
    status: 200,
    subjects,
  });
});

router.get("/subjects/:id/lessons", AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const lessons = await LessonService.getLessonsBySubjectId(id);

  return res.status(200).json({
    status: 200,
    lessons,
  });
});

router.get("/subjects/:id", async (req, res, next) => {
  const { id } = req.params;
  const subject = await SubjectService.getSubjectsById(id);

  if (!subject) {
    return next (new NotFoundError(ENTITY_NAME));
  }

  return res.status(200).json({
    status: 200,
    subject,
  });
})

router.delete("/subjects/:id", AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;

  const subject = await SubjectService.deleteSubject(id);

  if (!subject) {
    return next (new NotFoundError(ENTITY_NAME));
  }

  return res.status(202).json({
    status: 202,
  });
})

router.post("/subjects",
  AuthMiddleware,
  [
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("coordinators").not().isEmpty().isArray().withMessage("Coordinator is missing"),
    check("professors").not().isEmpty().withMessage("Professors are missing"),
    check("beginningDate").not().isEmpty().withMessage("Beginning Date is required"),
    check("endDate").not().isEmpty().withMessage("End date is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return BadRequestError(errors.array());
    };

    let subject;
    try {
      await SubjectService.createSubject(req.body);
    } catch(e) {
      return next(e);
    }

    return res.status(201).json({
      status: 201,
      subject,
    });
  });

router.put("/subjects/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    await SubjectService.updateSubject(id, req.body);
  } catch(e) {
    return next(e);
  };

  return res.status(201).json({
    status: 200,
  });
})

module.exports = router;
