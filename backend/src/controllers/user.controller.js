const express = require("express");
const router = express.Router();

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

router.post("/users", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }

    const user = await UserService.createUser(req.body);
    user.password = null;
    return res.status(201).json({
      status: 201,
      user,
    });
  } catch (e) {
    handleError(e, res);
  }
});

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

module.exports = router;
