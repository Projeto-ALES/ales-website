const mongoose = require("mongoose");
const connect = require("../../mongo");

const Course = require("../course");
const Professor = require("../professor");
const Lesson = require("../lesson");

connect("course_model_test");

describe("Course model test", () => {
  beforeAll(async () => {
    await Course.deleteMany({});
  });

  afterEach(async () => {
    await Course.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Course).toBeDefined();
  });

  describe("list courses", () => {
    it("list all courses", async () => {
      await Course.create({ name: "math" });
      await Course.create({ name: "science" });
      await Course.create({ name: "arts" });

      const courses = await Course.find({});
      expect(courses.length).toEqual(3);
    });
  });

  describe("get course", () => {
    it("gets a course", async () => {
      await Course.create({ name: "math", description: "very good" });
      const foundCourse = await Course.findOne({ name: "math" });
      expect(foundCourse.name).toEqual("math");
    });
  });

  describe("course not found", () => {
    it("gets a non existent course", async () => {
      const course = await Course.findOne({ name: "math" });
      expect(course).toEqual(null);
    });
  });

  describe("save course", () => {
    it("saves a course", async () => {
      const savedCourse = await Course.create({ name: "math", description: "very good" });
      expect(savedCourse.name).toEqual("math");
    });
  });

  describe("fields validation", () => {
    it("saves a course with valid fields", async () => {
      const savedCourse = await Course.create({ name: "math", description: "very good", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      expect(savedCourse._id).toBeDefined();
      expect(savedCourse.description).toBeDefined();
      expect(savedCourse.beginningDate).toBeDefined();
      expect(savedCourse.endDate).toBeDefined();
      expect(savedCourse.createdAt).toBeDefined();
    });
  });

  describe("invalid fields", () => {
    it("saves a course with an invalid field", async () => {
      const savedCourse = await Course.create({ name: "math", description: "very good", university: "mit" });
      expect(savedCourse._id).toBeDefined();
      expect(savedCourse.university).toBeUndefined();
    });
  });

  describe("required field missing", () => {
    it("tries to save a course without a required field", async () => {
      let error;
      try {
        await Course.create({ description: "very good" });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe("update course", () => {
    it("updates a course", async () => {
      const course = await Course.create({ name: "math", description: "very good" });
      course.name = "arts";
      const updatedCourse = await course.save();
      expect(updatedCourse.name).toEqual("arts");
    });
  });

  describe("try to update a course", () => {
    it("updates a non existent course", async () => {
      const course = await Course.create({ name: "math", description: "very good", beginningDate: new Date().toISOString() });
      await Course.deleteOne({ _id: course._id });
      let error;
      try {
        course.description = "not so good";
        await course.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
    });
  });

  describe("delete course", () => {
    it("deletes a course", async () => {
      const course = await Course.create({ name: "math", description: "very good" });
      await Course.findOneAndDelete({ name: course.name });
      const deletedCourse = await Course.findOne({ name: course.name });
      expect(deletedCourse).toEqual(null);
    });
  });

  describe("add coordinator", () => {
    it("adds a coordinator to a given course", async () => {
      const course = await Course.create({ name: "math", description: "very good" });
      await Professor.deleteMany({});
      const coord = await Professor.create({ name: "coord", email: "coord@mail" });
      await Course.findOneAndUpdate(
        { _id: course._id },
        { coordinator: coord._id },
        { new: true, useFindAndModify: false }
      );

      const { coordinator } = await Course.findOne({ name: course.name });
      const foundCoord = await Professor.findOne({ _id: coordinator });
      expect(foundCoord).not.toBeNull();
    });
  });

  describe("add professor", () => {
    it("adds professors to a given course", async () => {
      const course = await Course.create({ name: "math", description: "very good" });
      await Professor.deleteMany({});
      const prof1 = await Professor.create({ name: "prof1", email: "prof1@mail" });
      const prof2 = await Professor.create({ name: "prof2", email: "prof2@mail" });
      await Course.findOneAndUpdate(
        { _id: course._id },
        { $push: { professors: { $each: [prof1._id, prof2._id] } } },
        { new: true, useFindAndModify: false }
      );

      const { professors } = await Course.findOne({ name: course.name });
      expect(professors.length).toEqual(2);
    });
  });

  describe("add lesson", () => {
    it("adds lesson to a given course", async () => {
      const course = await Course.create({ name: "math", description: "very good" });
      await Lesson.deleteMany({});
      const lesson1 = await Lesson.create({ title: "lesson 1", description: "introduction" });
      const lesson2 = await Lesson.create({ title: "lesson 2", description: "initial project" });
      await Course.findOneAndUpdate(
        { _id: course._id },
        { $push: { lessons: { $each: [lesson1._id, lesson2._id] } } },
        { new: true, useFindAndModify: false }
      );

      const { lessons } = await Course.findOne({ name: course.name });
      expect(lessons.length).toEqual(2);
    });
  });
});