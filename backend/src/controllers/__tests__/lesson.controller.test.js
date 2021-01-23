const request = require("supertest");
const mongoose = require("mongoose");

const Lesson = require("../../models/lesson");
const LessonController = require("../lesson.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("lesson_controller_test");

describe("Lesson controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await Lesson.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await Lesson.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(LessonController).toBeDefined();
  });

  describe("lesson controllers test", () => {
    it("is unauthorized to get a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await request(app)
        .get(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to get a non existent lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Lesson.deleteOne({ _id });
      await authUser
        .get(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can get a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await authUser
        .get(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to update a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await request(app)
        .put(`/api/lessons/${_id}`)
        .send({ description: "closing class" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to update a non existent lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Lesson.deleteOne({ _id });
      await authUser
        .put(`/api/lessons/${_id}`)
        .send({ description: "closing class" })
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can update a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await authUser
        .put(`/api/lessons/${_id}`)
        .send({ description: "closing class" })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to delete a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await request(app)
        .delete(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to delete a non existent lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Lesson.deleteOne({ _id });
      await authUser
        .delete(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can delete a lesson", async () => {
      const { _id } = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await authUser
        .delete(`/api/lessons/${_id}`)
        .expect('Content-Type', /json/)
        .expect(202);
    });
  });
});