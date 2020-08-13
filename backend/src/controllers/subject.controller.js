const express = require("express");
const { check, validationResult } = require("express-validator");

const AuthMiddleware = require("../middlewares/auth.middleware");
const SubjectService = require("../services/subject.service");

const { NotFoundError } = require("../helpers/error");

const router = express.Router();

const ENTITY_NAME = "Subject";

router.get("/subjects", async (req, res) => {
  const subjects = await SubjectService.getSubjects({});
  return res.status(200).json({
    status: 200,
    subjects,
  });
});

router.get("/subjects/:id", async (req, res, next) => {
  const { id } = req.params;
  const subject = await SubjectService.getSubjectsById(id);

  if (!subject) {
    next (new NotFoundError(ENTITY_NAME));
  }

  return res.status(200).json({
    status: 200,
    subject,
  });
})

router.delete("subjects/:id", async (req, res, next) => {
  await AuthMiddleware.verifyAuth(req.headers.cookie);

  const { id } = req.params;

  const subject = await SubjectService.deleteSubject(id);

  if (!subject) {
    next (new NotFoundError(ENTITY_NAME));
  }

  return res.status(202).json({
    status: 202,
  });
})

router.post("/subjects",
  [
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("coordinators").not().isEmpty().isArray().withMessage("Coordinators are missing"),
    check("professors").not().isEmpty().withMessage("Professors are missing"),
    check("beginningDate").not().isEmpty().withMessage("Beginning Date is required"),
    check("endDate").not().isEmpty().withMessage("End date is missing"),
  ],
  async (req, res, next) => {
    await AuthMiddleware.verifyAuth(req.headers.cookie);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    };

    try {
      const subject = await SubjectService.createSubject(req.body);
    } catch(e) {
      next(e);
    }

    return res.status(201).json({
      status: 201,
      subject,
    });
  });

module.exports = router;
