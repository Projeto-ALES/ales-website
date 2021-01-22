const request = require("supertest");
const mongoose = require("mongoose");

const MailController = require("../mail.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("mail_controller_test");

describe("Mail controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    login(authUser, done);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(MailController).toBeDefined();
  });

  describe("mail controllers test", () => {
    it("tries to send an email without a name", async () => {
      await request(app)
        .post("/api/mail")
        .send({ email: "foo@mail", message: "foo bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to send an email without an email", async () => {
      await request(app)
        .post("/api/mail")
        .send({ name: "foo", message: "foo bar" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to send an email without a message", async () => {
      await request(app)
        .post("/api/mail")
        .send({ name: "foo", email: "foo@mail" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("can send an email", async () => {
      await request(app)
        .post("/api/mail")
        .send({ name: "foo", email: "foo@mail", message: "foo bar" })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});