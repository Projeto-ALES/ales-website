const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.controller"));
router.use("/users", require("./user.controller"));


module.exports = router;