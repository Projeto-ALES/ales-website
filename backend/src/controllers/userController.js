const express = require("express");

const User = require("../repository/models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // TODO: implement password encryption
    const user = await User.create(req.body);

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Bad request" });
  }
});

module.exports = app => app.use("/user", router);
