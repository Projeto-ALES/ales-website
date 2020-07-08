const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.auth);

router.post("/refresh-token", AuthController.refresh);

module.exports = router;
