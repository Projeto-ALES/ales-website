const mongoose = require("mongoose");
const connect = require("../../mongo");

const Lesson = require("../lesson");
const Professor = require("../professor");

connect("lesson_model_test");

describe("Lesson model test", () => {
  beforeAll(async () => {
    await Lesson.deleteMany({});
  });

  afterEach(async () => {
    await Lesson.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Lesson).toBeDefined();
  });

  describe("list lessons", () => {
    it("list all lessons from all courses", async () => {
      await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Lesson.create({ title: "lesson 2", description: "initial project" });
      await Lesson.create({ title: "lesson 3", description: "closing class" });

      const lessons = await Lesson.find({});
      expect(lessons.length).toEqual(3);
    });
  });

  describe("get lesson", () => {
    it("gets a lesson", async () => {
      await Lesson.create({ title: "lesson 1", description: "introduction" });
      const foundLesson = await Lesson.findOne({ title: "lesson 1" });
      expect(foundLesson.title).toEqual("lesson 1");
    });
  });

  describe("lesson not found", () => {
    it("gets a non existent lesson", async () => {
      const lesson = await Lesson.findOne({ title: "lesson 0" });
      expect(lesson).toEqual(null);
    });
  });

  describe("save lesson", () => {
    it("saves a lesson", async () => {
      const savedLesson = await Lesson.create({ title: "lesson 1", description: "introduction" });
      expect(savedLesson.title).toEqual("lesson 1");
    });
  });

  describe("fields validation", () => {
    it("saves a lesson with valid fields", async () => {
      const savedLesson = await Lesson.create({ title: "lesson 1", description: "introduction", date: new Date().toISOString() });
      expect(savedLesson._id).toBeDefined();
      expect(savedLesson.title).toBeDefined();
      expect(savedLesson.description).toBeDefined();
      expect(savedLesson.date).toBeDefined();
      expect(savedLesson.createdAt).toBeDefined();
    });
  });

  describe("invalid fields", () => {
    it("saves a lesson with an invalid field", async () => {
      const savedLesson = await Lesson.create({ title: "lesson 1", description: "introduction", local: "school" });
      expect(savedLesson._id).toBeDefined();
      expect(savedLesson.local).toBeUndefined();
    });
  });

  describe("required field missing", () => {
    it("tries to save a lesson without a required field", async () => {
      let error;
      try {
        await Lesson.create({ description: "introduction" });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe("update lesson", () => {
    it("updates a lesson", async () => {
      const lesson = await Lesson.create({ title: "lesson 1", description: "introduction" });
      lesson.description = "closing lesson";
      const updatedLesson = await lesson.save();
      expect(updatedLesson.title).toEqual("lesson 1");
    });
  });

  describe("try to update a lesson", () => {
    it("updates a non existent lesson", async () => {
      const lesson = await Lesson.create({ title: "lesson 1", description: "introduction", date: new Date().toISOString() });
      await Lesson.deleteOne({ _id: lesson._id });
      let error;
      try {
        lesson.description = "closing lesson";
        await lesson.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
    });
  });

  describe("delete lesson", () => {
    it("deletes a lesson", async () => {
      const lesson = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Lesson.findOneAndDelete({ title: lesson.title });
      const deletedLesson = await Lesson.findOne({ title: lesson.title });
      expect(deletedLesson).toEqual(null);
    });
  });

  describe("add professor", () => {
    it("adds professors to a given lesson", async () => {
      const lesson = await Lesson.create({ title: "lesson 1", description: "introduction" });
      await Professor.deleteMany({});
      const prof1 = await Professor.create({ name: "prof1", email: "prof1@mail" });
      const prof2 = await Professor.create({ name: "prof2", email: "prof2@mail" });
      await Lesson.findOneAndUpdate(
        { _id: lesson._id },
        { $push: { professors: { $each: [prof1._id, prof2._id] } } },
        { new: true, useFindAndModify: false }
      );

      const { professors } = await Lesson.findOne({ title: lesson.title });
      expect(professors.length).toEqual(2);
    });
  });
});