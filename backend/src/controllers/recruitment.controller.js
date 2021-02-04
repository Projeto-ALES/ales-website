const express = require('express');
const { check, validationResult } = require('express-validator');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const RecruitmentService = require("../services/recruitment.service");
const InterviewService = require("../services/interview.service");

const { createCalendar } = require("../calendar/services/createCalendar");
const { editCalendar } = require("../calendar/services/editCalendar");

const { BadRequestError, handleError, NotFoundError } = require('../helpers/error');

const router = express.Router();
const ENTITY_NAME = 'Process';

router.get('/',
  AuthMiddleware,
  async (req, res) => {
    const processes = await RecruitmentService.getProcesses(req.query || {});
    return res.status(200).json({
      status: 200,
      processes,
    });
  }
);

router.post('/',
  AuthMiddleware,
  [
    check('name').not().isEmpty().withMessage('Name is missing'),
    check('beginningDate')
      .not()
      .isEmpty()
      .withMessage('Beginning Date is required'),
    check('endDate').not().isEmpty().withMessage('End date is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const calendar = await createCalendar(req.body.name);
      const process = await RecruitmentService.createProcess({ ...req.body, calendarId: calendar.data.id });
      return res.status(201).json({
        status: 201,
        process,
        calendar,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.get('/:name',
  AuthMiddleware,
  async (req, res) => {
    try {
      const { name } = req.params;
      const process = await RecruitmentService.getProcessByName(name);
      if (!process) {
        throw new NotFoundError(ENTITY_NAME);
      }

      return res.status(200).json({
        status: 200,
        process,
      });
    }
    catch (e) {
      handleError(e, res);
    }
  }
);

router.delete('/:name',
  AuthMiddleware,
  async (req, res) => {
    try {
      const { name } = req.params;
      const process = await RecruitmentService.deleteProcessByName(name);
      if (!process) {
        throw new NotFoundError(ENTITY_NAME);
      }

      return res.status(202).json({
        status: 202,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.put('/:name',
  AuthMiddleware,
  async (req, res) => {
    try {
      const { name } = req.params;
      const process = await RecruitmentService.updateProcess(name, req.body);
      if (!process) {
        throw new NotFoundError(ENTITY_NAME);
      }
      await editCalendar(process.calendarId, process.name);

      return res.status(200).json({
        status: 200,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.post("/:name/interviews",
  AuthMiddleware,
  [
    check('interviews').not().isEmpty().withMessage('Interviews field is missing'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
      }

      const { name } = req.params;
      const { interviews } = req.body;

      const docs = await InterviewService.createManyInterviews(interviews);
      if (!docs) {
        throw new BadRequestError("Some interviews are invalid");
      }

      const docs_refs = await docs.map(doc => doc._id);
      await RecruitmentService.addInterviews(name, docs_refs);

      return res.status(200).json({
        status: 200,
      });

    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;
