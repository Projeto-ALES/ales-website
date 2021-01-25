const express = require('express');
const { check, validationResult } = require('express-validator');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const RecruitmentService = require("../services/recruitment.service");

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

      const process = await RecruitmentService.createProcess(req.body);
      return res.status(201).json({
        status: 201,
        process,
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

      return res.status(200).json({
        status: 200,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

module.exports = router;
