const express = require('express');
const { check, validationResult } = require('express-validator');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const RecruitmentService = require("../services/recruitment.service");

const { BadRequestError, handleError } = require('../helpers/error');

const router = express.Router();


router.get('/',
  AuthMiddleware,
  async (req, res) => {
    const processes = await RecruitmentService.getProcesses({});
    return res.status(200).json({
      status: 200,
      processes,
    });
  });

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
  })

module.exports = router;