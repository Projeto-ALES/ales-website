const mongoose = require("mongoose");
const connect = require("../../mongo");

const Recruitment = require("../recruitment");
const Interview = require("../interview");

connect("recruitment_model_test");

describe("Recruitment model test", () => {
  beforeAll(async () => {
    await Recruitment.deleteMany({});
  });

  afterEach(async () => {
    await Recruitment.deleteMany({});
    await Interview.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Recruitment).toBeDefined();
  });

  describe("list recruitment processes", () => {
    it("list all recruitment processes", async () => {
      await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      await Recruitment.create({ name: "2S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      await Recruitment.create({ name: "1S2021", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });

      const processes = await Recruitment.find({});
      expect(processes.length).toEqual(3);
    });
  });

  describe("get recruitment", () => {
    it("gets a recruitment process", async () => {
      await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      const process = await Recruitment.findOne({ name: "1S2020" });
      expect(process.name).toEqual("1S2020");
    });
  });

  describe("process not found", () => {
    it("gets a non existent recruitment process", async () => {
      const process = await Recruitment.findOne({ name: "1S2020" });
      expect(process).toEqual(null);
    });
  });

  describe("save process", () => {
    it("saves a recruitment process", async () => {
      const process = await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      expect(process.name).toEqual("1S2020");
    });

    it("tries to create an recruitment process with duplicated name", async () => {
      await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      let error;
      try {
        await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.mongo.MongoError);
    });
  });

  describe("fields validation", () => {
    it("saves a recruitment process with valid fields", async () => {
      const savedProcess = await Recruitment.create({ name: "1S2020", description: "recruitment process", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      expect(savedProcess._id).toBeDefined();
      expect(savedProcess.name).toBeDefined();
      expect(savedProcess.description).toBeDefined();
      expect(savedProcess.beginningDate).toBeDefined();
      expect(savedProcess.endDate).toBeDefined();
      expect(savedProcess.status).toBeDefined();
      expect(savedProcess.createdAt).toBeDefined();
    });
  });

  describe("invalid fields", () => {
    it("saves a recruitment process with an invalid field", async () => {
      const savedProcess = await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString(), place: "campinas" });
      expect(savedProcess._id).toBeDefined();
      expect(savedProcess.place).toBeUndefined();
    });

    it("saves a recruitment process without a name", async () => {
      let error;
      try {
        await Recruitment.create({ beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    it("saves a recruitment process without a beginningDate", async () => {
      let error;
      try {
        await Recruitment.create({ name: "1S2020", endDate: new Date().toISOString() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    it("saves a recruitment process without a endDate", async () => {
      let error;
      try {
        await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString() });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe("update process", () => {
    it("updates a recruitment process", async () => {
      const process = await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      process.description = "recruitment process";
      const updatedProcess = await process.save();
      expect(updatedProcess.name).toEqual(process.name);
    });

    it("updates a non existent recruitment process", async () => {
      const process = await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      await Recruitment.deleteOne({ _id: process._id });
      let error;
      try {
        process.description = "recruitment process";
        await process.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
    });
  });

  describe("delete process", () => {
    it("deletes a recruitment process", async () => {
      const process = await Recruitment.create({ name: "1S2020", beginningDate: new Date().toISOString(), endDate: new Date().toISOString() });
      await Recruitment.findOneAndDelete({ name: process.name });
      const deletedProcess = await Recruitment.findOne({ name: process.name });
      expect(deletedProcess).toEqual(null);
    });
  });

  describe("add interview", () => {
    it("adds interviews to a given recruitment process", async () => {
      const process = await Recruitment.create({ name: "1S2020", beginningDate: Date.now(), endDate: Date.now() });
      await Interview.deleteMany({});
      const interview1 = await Interview.create({ start: Date.now(), end: Date.now() });
      const interview2 = await Interview.create({ start: Date.now(), end: Date.now() });
      await Recruitment.findOneAndUpdate(
        { _id: process._id },
        { $push: { interviews: { $each: [interview1._id, interview2._id] } } },
        { new: true, useFindAndModify: false }
      );

      const { interviews } = await Recruitment.findOne({ name: process.name });
      expect(interviews.length).toEqual(2);
    });
  });
});