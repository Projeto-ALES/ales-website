const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../models/user");
const PasswordController = require("../password.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("password_controller_test");

describe("Password controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await User.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(PasswordController).toBeDefined();
  });

  describe("password controllers test", () => {
    it("is unauthorized to update password", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await request(app)
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "foo_bar", new_password_conf: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to update password without passing the current one", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ new_password: "foo_bar", new_password_conf: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update password without the new one", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password_conf: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update password without the new password's confirmation", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update password with new password's length < 5", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "bar", new_password_conf: "bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update password with new password and its confirmation being differents", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "foo_bar", new_password_conf: "foo__bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update password of a non existent user", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await User.deleteOne({ _id });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "foo_bar", new_password_conf: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can update a user's password", async () => {
      const { _id } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post(`/api/password/update/${_id}`)
        .send({ password: "foobar", new_password: "foo_bar", new_password_conf: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("tries to reset password without an email", async () => {
      await authUser
        .post("/api/password/reset/")
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to reset password for a non existent user", async () => {
      const { email } = await User.create({ email: "foo@mail", password: "foobar" });
      await User.deleteOne({ email });
      await authUser
        .post("/api/password/reset/")
        .send({ email })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("successfully sends an email with link to update password", async () => {
      const { email } = await User.create({ email: "foo@mail", password: "foobar" });
      await authUser
        .post("/api/password/reset/")
        .send({ email })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("tries to set a new password without a token", async () => {
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", new_password_conf: "foobar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to set a new password without it", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password_conf: "foobar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to set a new password without its confirmation", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to set a new password with length < 5", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "bar", new_password_conf: "bar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to set a new password with its confirmation being different", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", new_password_conf: "foo_bar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to set a new password for a non existent user", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await User.deleteOne({ passwordToken: "_foo_" });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", new_password_conf: "foobar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("tries to set a new password with an expired token", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 1
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", new_password_conf: "foobar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("can set a new password", async () => {
      await User.create({
        email: "foo@mail",
        password: "foobar",
        passwordToken: "_foo_",
        passwordTokenExp: Date.now() + 360000
      });
      await request(app)
        .post("/api/password/new/")
        .send({ new_password: "foobar", new_password_conf: "foobar", token: "_foo_" })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});