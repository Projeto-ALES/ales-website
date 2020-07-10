const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.auth);

router.post("/refresh-token", AuthController.refresh);

router.post("/update-password/:id", AuthController.updatePassword);

module.exports = router;
