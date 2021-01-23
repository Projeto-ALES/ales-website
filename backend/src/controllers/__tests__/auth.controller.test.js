const request = require("supertest");
const mongoose = require("mongoose");

const AuthController = require("../auth.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");
const User = require("../../models/user");

const app = createServer();
connect("auth_controller_test");

describe("Auth controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await User.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await User.deleteMany({});
  })

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(AuthController).toBeDefined();
  });

  describe("auth controllers test", () => {
    it("tries to log in without an email", async () => {
      await request(app)
        .post("/api/auth/login")
        .send({ password: "foobar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to log in without a password", async () => {
      await request(app)
        .post("/api/auth/login")
        .send({ email: "foo@mail" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to log in without a password", async () => {
      await request(app)
        .post("/api/auth/login")
        .send({ email: "foo@mail" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to log in with invalid credentials", async () => {
      const { email } = await User.create({ email: "foo@mail", password: "foobar" });
      await request(app)
        .post("/api/auth/login")
        .send({ email, password: "foo_bar" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can log in", async () => {
      const { email } = await User.create({ email: "foo@mail", password: "foobar" });
      await request(app)
        .post("/api/auth/login")
        .send({ email, password: "foobar" })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("can refresh jwt", async () => {
      await authUser
        .post("/api/auth/refresh-token")
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("can logout", async () => {
      await authUser
        .post("/api/auth/logout")
        .expect('Content-Type', /json/)
        .expect(202);
    });

    it("is unauthorized to get me", async () => {
      await request(app)
        .get("/api/auth/me")
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });
});