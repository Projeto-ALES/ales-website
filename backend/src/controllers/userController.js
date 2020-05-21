const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../repository/models/user");

const router = express.Router();

const { SECRET_JWT_KEY } = process.env;

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

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found " });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: "Invalid Password" });
  }

  // Removes password from http response
  user.password = undefined;

  const token = jwt.sign(
    { email: user.email, roles: user.roles, name: user.name },
    SECRET_JWT_KEY,
    {
      expiresIn: 86400,
    }
  );
  res.status(200).send({ user, token });
});

module.exports = app => app.use("/user", router);
