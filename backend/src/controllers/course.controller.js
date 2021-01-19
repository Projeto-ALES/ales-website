const express = require('express');
const { check, validationResult } = require('express-validator');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const CourseService = require('../services/course.service');
const LessonService = require("../services/lesson.service");

const { BadRequestError, NotFoundError, handleError } = require('../helpers/error');

const router = express.Router();

const ENTITY_NAME = 'Course';

router.get('/', async (req, res) => {
  const courses = await CourseService.getCourses({});
  return res.status(200).json({
    status: 200,
    courses,
  });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const course = await CourseService.getCourseById(id);

  if (!course) {
    return next(new NotFoundError(ENTITY_NAME));
  }

  return res.status(200).json({
    status: 200,
    course,
  });
});

router.delete('/:id', AuthMiddleware, async (req, res, next) => {
  const { id } = req.params;

  const course = await CourseService.deleteCourse(id);

  if (!course) {
    return next(new NotFoundError(ENTITY_NAME));
  }

  return res.status(202).json({
    status: 202,
  });
});

router.post(
  '/',
  AuthMiddleware,
  [
    check('name').not().isEmpty().withMessage('Name is missing'),
    check('coordinator').not().isEmpty().withMessage('Coordinator is missing'),
    check('professors').not().isEmpty().withMessage('Professors are missing'),
    check('beginningDate')
      .not()
      .isEmpty()
      .withMessage('Beginning Date is required'),
    check('endDate').not().isEmpty().withMessage('End date is missing'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    let course;
    try {
      course = await CourseService.createCourse(req.body);
    } catch (e) {
      return next(e);
    }

    return res.status(201).json({
      status: 201,
      course,
    });
  }
);

router.put('/:id', AuthMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    await CourseService.updateCourse(id, req.body);
  } catch (e) {
    return next(e);
  }

  return res.status(201).json({
    status: 200,
  });
});

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

module.exports = router;
