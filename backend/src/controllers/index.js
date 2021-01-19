const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.controller"));
router.use("/users", require("./user.controller"));
router.use("/professors", require("./professor.controller"));
router.use("/password", require("./password.controller"));
router.use("/mail", require("./mail.controller"));
router.use("/courses", require("./course.controller"));

module.exports = router;