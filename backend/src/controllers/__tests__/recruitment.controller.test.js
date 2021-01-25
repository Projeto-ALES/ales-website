const request = require("supertest");
const mongoose = require("mongoose");

const Recruitment = require("../../models/recruitment");
const RecruitmentController = require("../recruitment.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("recruitment_controller_test");

describe("Recruitment controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await Recruitment.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await Recruitment.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(RecruitmentController).toBeDefined();
  });

  describe("recruitment controllers test", () => {
    it("is unauthorized to list processes", async () => {
      await request(app)
        .get("/api/recruitment")
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can list processes", async () => {
      await authUser
        .get("/api/recruitment")
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to create a process", async () => {
      await request(app)
        .post("/api/recruitment")
        .send({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to create a process without a name", async () => {
      await authUser
        .post("/api/recruitment")
        .send({ beginningDate: Date.now(), endDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a process with a duplicated name", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await authUser
        .post("/api/recruitment")
        .send({ name, beginningDate: Date.now(), endDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(409);
    });

    it("tries to create a process without a beginningDate", async () => {
      await authUser
        .post("/api/recruitment")
        .send({ name: "1S2020", endDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a process without a endDate", async () => {
      await authUser
        .post("/api/recruitment")
        .send({ name: "1S2020", beginningDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("creates a new recruitment process", async () => {
      await authUser
        .post("/api/recruitment")
        .send({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() })
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it("is unauthorized to get a process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await request(app)
        .get(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to get a non existent recruitment process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await Recruitment.deleteOne({ name });
      await authUser
        .get(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("gets a recruitment process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await authUser
        .get(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to delete a process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await request(app)
        .delete(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to delete a non existent recruitment process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await Recruitment.deleteOne({ name });
      await authUser
        .delete(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("deletes a recruitment process", async () => {
      const { name } = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await authUser
        .delete(`/api/recruitment/${name}`)
        .expect('Content-Type', /json/)
        .expect(202);
    });
  });
});