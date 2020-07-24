const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const UserService = require("../services/user.service");
const { handleError } = require("../helpers/error");

router.get("/users", async (req, res) => {
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
  "/users",
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

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(202).json({
      status: 202,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

router.get("/me", async (req, res) => {
  try {
    const { cookie } = req.headers;
    const rawCookies = cookie.split(";");
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
      const parsedCookie = rawCookie.split("=");
      parsedCookies[parsedCookie[0].trim()] = parsedCookie[1];
    });

    const token = parsedCookies["token"];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "An access token is required",
      });
    }

    const { TOKEN_SECRET } = process.env;
    const { id } = jwt.verify(token, TOKEN_SECRET);

    const user = await UserService.getUser(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const { _id, name, email } = user;
    return res.status(200).json({
      status: 200,
      user: {
        _id,
        name,
        email,
      },
    });
  } catch (e) {
    handleError(e, res);
  }
});

module.exports = router;
