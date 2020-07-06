const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/users", UserController.getUsers);

router.post("/users", UserController.createUser);

router.get("/users/:id", UserController.getUser);

module.exports = router;
