const express = require('express');
const { check, validationResult } = require('express-validator');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const CourseService = require('../services/course.service');
const LessonService = require('../services/lesson.service');

const { NotFoundError } = require('../helpers/error');

const router = express.Router();

const ENTITY_NAME = 'Course';

router.get('/courses', async (req, res) => {
  const courses = await CourseService.getCourses({});
  return res.status(200).json({
    status: 200,
    courses,
  });
});

router.get('/courses/:id', async (req, res, next) => {
  const { id } = req.params;
  const course = await CourseService.getCourseById(id);
  const lessons = await LessonService.getLessonsByCourseId(id);

  if (!course) {
    return next(new NotFoundError(ENTITY_NAME));
  }

  return res.status(200).json({
    status: 200,
    course,
    lessons
  });
});

router.delete('/courses/:id', AuthMiddleware, async (req, res, next) => {
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
  '/courses',
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

router.put('/courses/:id', AuthMiddleware, async (req, res, next) => {
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

module.exports = router;
