const mongoose = require("mongoose");
const connect = require("../../mongo");

const Interview = require("../interview");

connect("interview_model_test");

describe("Interview model test", () => {
  beforeAll(async () => {
    await Interview.deleteMany({});
  });

  afterEach(async () => {
    await Interview.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Interview).toBeDefined();
  });

  describe("list interviews", () => {
    it("list all interviews", async () => {
      await Interview.create({ start: Date.now(), end: Date.now() });
      await Interview.create({ start: Date.now(), end: Date.now() });
      await Interview.create({ start: Date.now(), end: Date.now() });

      const interviews = await Interview.find({});
      expect(interviews.length).toEqual(3);
    });
  });

  describe("get interview", () => {
    it("tries to get an non existent interview", async () => {
      const { _id } = await Interview.create({ start: Date.now(), end: Date.now() });
      await Interview.deleteOne({ _id });
      const foundInterview = await Interview.findOne({ _id });
      expect(foundInterview).toEqual(null);
    });

    it("gets an interview", async () => {
      const { _id } = await Interview.create({ start: Date.now(), end: Date.now() });
      const foundInterview = await Interview.findOne({ _id });
      expect(foundInterview._id).toEqual(_id);
    });
  });

  describe("save interview", () => {
    it("saves an interview", async () => {
      const savedInterview = await Interview.create({ start: Date.now(), end: Date.now() });
      expect(savedInterview).not.toEqual(null);
    });
  });

  describe("fields validation", () => {
    it("saves an interview with valid fields", async () => {
      const savedInterview = await Interview.create({ start: Date.now(), end: Date.now() });
      expect(savedInterview._id).toBeDefined();
      expect(savedInterview.start).toBeDefined();
      expect(savedInterview.end).toBeDefined();
      expect(savedInterview.status).toBeDefined();
      expect(savedInterview.createdAt).toBeDefined();
    });

    it("saves an interview with an invalid field", async () => {
      const savedInterview = await Interview.create({ start: Date.now(), end: Date.now(), place: "sp" });
      expect(savedInterview._id).toBeDefined();
      expect(savedInterview.place).toBeUndefined();
    });

    it("tries to save an interview without start date", async () => {
      let error;
      try {
        await Interview.create({ end: Date.now() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    it("tries to save an interview without end date", async () => {
      let error;
      try {
        await Interview.create({ start: Date.now() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe("update interview", () => {
    it("tries to update an non existent interview", async () => {
      const interview = await Interview.create({ start: Date.now(), end: Date.now() });
      await Interview.deleteOne({ _id: interview._id });
      let error;
      try {
        interview.status = "pending";
        await interview.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
    });

    it("updates an interview", async () => {
      const interview = await Interview.create({ start: Date.now(), end: Date.now() });
      interview.status = "pending";
      const updatedInterview = await interview.save();
      expect(updatedInterview._id).toEqual(interview._id);
    });
  });

  describe("delete interview", () => {
    it("tries to delete a non existent interview", async () => {
      const interview = await Interview.create({ start: Date.now(), end: Date.now() });
      await Interview.findOneAndDelete({ _id: interview._id });
      const { deletedCount } = await Interview.deleteOne({ _id: interview._id });
      expect(deletedCount).toEqual(0);
    });

    it("deletes an interview", async () => {
      const interview = await Interview.create({ start: Date.now(), end: Date.now() });
      const { deletedCount } = await Interview.deleteOne({ _id: interview._id });
      expect(deletedCount).toEqual(1);
    });
  });
});