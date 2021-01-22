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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseService.getCourseById(id);

    if (!course) {
      throw new NotFoundError(ENTITY_NAME);
    }

    return res.status(200).json({
      status: 200,
      course,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete('/:id', AuthMiddleware, async (req, res,) => {
  try {
    const { id } = req.params;
    const course = await CourseService.deleteCourse(id);

    if (!course) {
      throw new NotFoundError(ENTITY_NAME);
    }

    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }
      const course = await CourseService.createCourse(req.body);
      return res.status(201).json({
        status: 201,
        course,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.put('/:id', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await CourseService.updateCourse(id, req.body);

    return res.status(200).json({
      status: 200,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post("/:id/lessons",
  AuthMiddleware,
  [
    check("title").not().isEmpty().withMessage("Lesson name is missing"),
    check("description").not().isEmpty().withMessage("Lesson description is missing"),
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      };

      let course = await CourseService.getCourseById(req.params.id);
      if (!course) {
        throw new BadRequestError(ENTITY_NAME);
      }

      const lesson = await LessonService.createLesson(req.body);
      course = await CourseService.addLesson(course._id, lesson._id);

      return res.status(201).json({
        status: 201,
        course,
      });
    } catch (e) {
      handleError(e, res);
    }
  });

module.exports = router;
