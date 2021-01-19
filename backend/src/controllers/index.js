const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.controller"));
router.use("/users", require("./user.controller"));
router.use("/professors", require("./professor.controller"));

module.exports = router;