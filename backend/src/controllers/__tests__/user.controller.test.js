const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../models/user");
const UserController = require("../user.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("user_controller_test");

describe("User controller test", () => {

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
    expect(UserController).toBeDefined();
  });

  describe("user controllers test", () => {
    it("is unauthorized to list users", async () => {
      await request(app)
        .get("/api/users")
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can list users", async () => {
      await authUser
        .get("/api/users")
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to get user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await request(app)
        .get(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to get a non existent user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await User.deleteOne({ email: "foo@mail" });
      await authUser
        .get(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can get user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await authUser
        .get(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to create a user", async () => {
      const user = { name: "foo", email: "foo@mail", password: "bar" };
      await request(app)
        .post("/api/users/")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can create a user", async () => {
      const user = { name: "foo", email: "foo@mail", password: "foobar" };
      await authUser
        .post("/api/users/")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it("tries to create a user without a name", async () => {
      const user = { email: "foo@mail", password: "foobar" };
      await authUser
        .post("/api/users/")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a user without a password", async () => {
      const user = { name: "foo", email: "foo@mail" };
      await authUser
        .post("/api/users/")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a user with password's length < 5", async () => {
      const user = { name: "foo", email: "foo@mail", password: "bar" };
      await authUser
        .post("/api/users/")
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a duplicated user", async () => {
      await User.create({ name: "foo", email: "foo@mail", password: "foobar" });
      await authUser
        .post("/api/users/")
        .send({ name: "bar", email: "foo@mail", password: "foobar" })
        .expect('Content-Type', /json/)
        .expect(409);
    });

    it("is unauthorized to delete a user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await request(app)
        .delete(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to delete a non existent user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await User.deleteOne({ email: "foo@mail" });
      await authUser
        .delete(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can delete a user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await authUser
        .delete(`/api/users/${_id}`)
        .expect('Content-Type', /json/)
        .expect(202);
    });

    it("is unauthorized to update a user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await request(app)
        .put(`/api/users/${_id}`)
        .send({ name: "foo" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to update a non existent user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await User.deleteOne({ email: "foo@mail" });
      await authUser
        .put(`/api/users/${_id}`)
        .send({ name: "foo" })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can update a user", async () => {
      const { _id } = await User.create({ email: "foo@mail" });
      await authUser
        .put(`/api/users/${_id}`)
        .send({ name: "foo" })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});