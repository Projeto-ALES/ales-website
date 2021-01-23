const express = require("express");
const request = require("supertest");

const User = require("../models/user");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use("/api", require("../controllers/index"));
  return app;
};

const createAgent = app => {
  return request.agent(app);
};

const login = async (user, done) => {
  await User.deleteMany({});
  const admin = { email: "admin@mail", password: "admin" };
  await User.create(admin);

  user
    .post("/api/auth/login")
    .send(admin)
    .end((err, resp) => {
      if (err) {
        throw err;
      }
      done();
    });
};


module.exports = {
  createServer,
  createAgent,
  login,
};