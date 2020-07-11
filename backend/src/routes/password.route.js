const express = require("express");
const router = express.Router();

const PasswordController = require("../controllers/password.controller");

router.post("/update-password/:id", PasswordController.updatePassword);

router.post("/reset-password", PasswordController.resetPassword);

module.exports = router;
