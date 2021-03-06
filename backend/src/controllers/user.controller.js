const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const { AuthMiddleware } = require("../middlewares/auth.middleware");

const UserService = require("../services/user.service");
const { handleError, ErrorHandler } = require("../helpers/error");

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const users = await UserService.getUsers({});
    return res.status(200).json({
      status: 200,
      users,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.post(
  "/",
  AuthMiddleware,
  [
    check("email").not().isEmpty().withMessage("Email is missing"),
    check("name").not().isEmpty().withMessage("Name is missing"),
    check("password").not().isEmpty().withMessage("Password is missing"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 chars long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const user = await UserService.createUser(req.body);
      user.password = null;
      return res.status(201).json({
        status: 201,
        user,
      });
    } catch (e) {
      handleError(e, res);
    }
  }
);

router.get("/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put("/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
