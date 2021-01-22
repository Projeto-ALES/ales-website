const request = require("supertest");
const mongoose = require("mongoose");

const Course = require("../../models/course");
const Professor = require("../../models/professor");
const CourseController = require("../course.controller");

const { createServer, createAgent, login } = require("../../helpers/test");
const connect = require("../../mongo");

const app = createServer();
connect("course_controller_test");

describe("Course controller test", () => {

  const authUser = createAgent(app);

  beforeAll(async (done) => {
    await Course.deleteMany({});
    login(authUser, done);
  });

  afterEach(async () => {
    await Course.deleteMany({});
    await Professor.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(CourseController).toBeDefined();
  });

  describe("course controllers test", () => {
    it("can list courses", async () => {
      await request(app)
        .get("/api/courses")
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("tries to get a non existent course", async () => {
      const { _id } = await Course.create({ name: "math" });
      await Course.deleteOne({ name: "math" });
      await request(app)
        .get(`/api/courses/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can get a course", async () => {
      const { _id } = await Course.create({ name: "math" });
      await request(app)
        .get(`/api/courses/${_id}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to delete a course", async () => {
      const { _id } = await Course.create({ name: "math" });
      await request(app)
        .delete(`/api/courses/${_id}`)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to delete a non existent course", async () => {
      const { _id } = await Course.create({ name: "math" });
      await Course.deleteOne({ name: "math" });
      await authUser
        .delete(`/api/courses/${_id}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it("can delete a course", async () => {
      const { _id } = await Course.create({ name: "math" });
      await authUser
        .delete(`/api/courses/${_id}`)
        .expect('Content-Type', /json/)
        .expect(202);
    });

    it("is unauthorized to create a course", async () => {
      const course = { name: "math", description: "very good" };
      await request(app)
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to create a course without a name", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        beginningDate: Date.now(),
        endDate: Date.now(),
        coordinator: _id,
        professors: [_id]
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a course without a beginningDate", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        name: "math",
        endDate: Date.now(),
        coordinator: _id,
        professors: [_id]
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a course without a endDate", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        name: "math",
        beginningDate: Date.now(),
        coordinator: _id,
        professors: [_id]
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a course without a coordinator", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        name: "math",
        beginningDate: Date.now(),
        endDate: Date.now(),
        professors: [_id]
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to create a course without professors", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        name: "math",
        beginningDate: Date.now(),
        endDate: Date.now(),
        coordinator: _id
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("can create a course", async () => {
      const { _id } = await Professor.create({ name: "foo", email: "foo@mail" });
      const course = {
        name: "math",
        beginningDate: Date.now(),
        endDate: Date.now(),
        coordinator: _id,
        professors: [_id]
      };
      await authUser
        .post("/api/courses")
        .send(course)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it("is unauthorized to update a course", async () => {
      const course = await Course.create({ name: "math" });
      await request(app)
        .put(`/api/courses/${course._id}`)
        .send({ description: "very good" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("can update a course", async () => {
      const course = await Course.create({ name: "math" });
      await authUser
        .put(`/api/courses/${course._id}`)
        .send({ description: "very good" })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it("is unauthorized to add a lesson", async () => {
      const course = await Course.create({ name: "math" });
      await request(app)
        .post(`/api/courses/${course._id}/lessons`)
        .send({ title: "lesson 1", description: "introduction" })
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it("tries to add a lesson without a title", async () => {
      const course = await Course.create({ name: "math" });
      await authUser
        .post(`/api/courses/${course._id}/lessons`)
        .send({ description: "introduction" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to add a lesson without a description", async () => {
      const course = await Course.create({ name: "math" });
      await authUser
        .post(`/api/courses/${course._id}/lessons`)
        .send({ title: "lesson 1" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("tries to add a lesson to a non existent course", async () => {
      const course = await Course.create({ name: "math" });
      await Course.deleteOne({ name: "math" })
      await authUser
        .post(`/api/courses/${course._id}/lessons`)
        .send({ title: "lesson 1", description: "introduction" })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it("can add a lesson to a course", async () => {
      const course = await Course.create({ name: "math" });
      await authUser
        .post(`/api/courses/${course._id}/lessons`)
        .send({ title: "lesson 1", description: "introduction" })
        .expect('Content-Type', /json/)
        .expect(201);
    });
  });
});