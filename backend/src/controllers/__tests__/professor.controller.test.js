const request = require("supertest");
const mongoose = require("mongoose");

const Professor = require("../../models/professor");
const ProfessorController = require("../professor.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("prof_controller_test");

describe("Professor controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await Professor.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await Professor.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(ProfessorController).toBeDefined();
  });

  describe("professor controllers test", () => {
    it("is unauthorized to list professors", async () => {
      await request(app)
        .get("/api/professors")
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can list professors", async () => {
      await authUser
        .get("/api/professors")
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to get professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await request(app)
        .get(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to get a non existent professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await Professor.deleteOne({ email: "foo@mail" });
      await authUser
        .get(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can get professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await authUser
        .get(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to invite a professor", async () => {
      await request(app)
        .post("/api/professors/invite")
        .send({})
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to invite a professor without an email", async () => {
      await authUser
        .post("/api/professors/invite")
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to invite a professor that is active already", async () => {
      const { email } = await Professor.create({ email: "foo@mail", status: "active" });
      await authUser
        .post("/api/professors/invite")
        .send({ email })
        .expect('Content-Type', /json/)
        .expect(409);
    });

    it("tries to invite a professor that has a pending invite", async () => {
      const { email } = await Professor.create({ email: "foo@mail", status: "invited" });
      await authUser
        .post("/api/professors/invite")
        .send({ email })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("tries to create a professor without an invite token", async () => {
      const prof = { name: "foo", password: "foobar", password_conf: "foobar", phone: "9999" };
      await authUser
        .post("/api/professors/")
        .send(prof)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor without a name", async () => {
      const prof = { name: "foo", password: "foobar", password_conf: "foobar", phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(prof)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor without a password", async () => {
      const prof = { name: "foo", password_conf: "foobar", phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(prof)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor without a password confirmation", async () => {
      const prof = { name: "foo", password: "foobar", phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(prof)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor without a phone", async () => {
      const prof = { name: "foo", password: "foobar", password_conf: "foobar", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(prof)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor with an invalid invite token", async () => {
      const prof = await Professor.create({ email: "foo@mail", status: "invited", inviteToken: "foobar", inviteTokenExp: Date.now() + 360000 });
      const invitedProf = { name: "foo", password: "foobar", password_conf: "foobar", email: prof.email, phone: "9999", inviteToken: "foo_bar" };
      await authUser
        .post("/api/professors/")
        .send(invitedProf)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor with an expired invite token", async () => {
      const prof = await Professor.create({ email: "foo@mail", status: "invited", inviteToken: "foobar", inviteTokenExp: Date.now() });
      const invitedProf = { name: "foo", password: "foobar", password_conf: "foobar", email: prof.email, phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(invitedProf)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a professor when his password and its confirmation are different", async () => {
      const prof = await Professor.create({ email: "foo@mail", status: "invited", inviteToken: "foobar", inviteTokenExp: Date.now() + 360000 });
      const invitedProf = { name: "foo", password: "foobar", password_conf: "foo_bar", email: prof.email, phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(invitedProf)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("creates a professor", async () => {
      const prof = await Professor.create({ email: "foo@mail", status: "invited", inviteToken: "foobar", inviteTokenExp: Date.now() + 360000 });
      const invitedProf = { name: "foo", password: "foobar", password_conf: "foobar", email: prof.email, phone: "9999", inviteToken: "foobar" };
      await authUser
        .post("/api/professors/")
        .send(invitedProf)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it("is unauthorized to delete a professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await request(app)
        .delete(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to delete a non existent professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await Professor.deleteOne({ email: "foo@mail" });
      await authUser
        .delete(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can delete a professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await authUser
        .delete(`/api/professors/${_id}`)
        .expect('Content-Type', /json/)
        .expect(202);
    });

    it("is unauthorized to update a professor", async () => {
      const { _id } = await Professor.create({ email: "foo@mail" });
      await request(app)
        .put(`/api/professors/${_id}`)
        .send({ name: "foo" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to update a professor without an email", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999" });
      await authUser
        .put(`/api/professors/${_id}`)
        .send({ name: "foo", phone: "9999" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update a professor without a name", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999" });
      await authUser
        .put(`/api/professors/${_id}`)
        .send({ email: "foo@mail", phone: "9999" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update a professor without a phone", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999" });
      await authUser
        .put(`/api/professors/${_id}`)
        .send({ name: "foo", email: "foo@mail" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to update a professor that is not me", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999", password: "foobar" });
      await authUser
        .put(`/api/professors/${_id}`)
        .send({ name: "bar", email: "foo@mail", phone: "9999" })
        .expect('Content-Type', /json/)
        .expect(403);
    });

    it("tries to update a non existent professor", async () => {
      const { _id, email } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999", password: "foobar" });
      const AuthMe = request.agent(app);
      await AuthMe
        .post("/api/auth/login")
        .send({ email, password: "foobar" });
      await Professor.deleteOne({ email });
      await AuthMe
        .put(`/api/professors/${_id}`)
        .send({ name: "bar", email: "foo@mail", phone: "9999" })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can update a professor", async () => {
      const { _id, email } = await Professor.create({ name: "foo", email: "foo@mail", phone: "9999", password: "foobar" });
      const AuthMe = request.agent(app);
      await AuthMe
        .post("/api/auth/login")
        .send({ email, password: "foobar" });
      await AuthMe
        .put(`/api/professors/${_id}`)
        .send({ name: "bar", email: "foo@mail", phone: "9999" })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});