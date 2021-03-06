const mongoose = require("mongoose");
const connect = require("../../mongo");
const Professor = require("../professor");

connect("professor_model_test");

describe("Professor model test", () => {
  beforeAll(async () => {
    await Professor.deleteMany({});
  });

  afterEach(async () => {
    await Professor.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Professor).toBeDefined();
  });

  describe("list professors", () => {
    it("list all professors", async () => {
      await Professor.create({ name: "prof1", email: "prof1@mail", password: "bar", area: "math" });
      await Professor.create({ name: "prof2", email: "prof2@mail", password: "bar", area: "math" });
      await Professor.create({ name: "prof3", email: "prof3@mail", password: "bar", area: "math" });

      const professors = await Professor.find({});
      expect(professors.length).toEqual(3);
    });
  });

  describe("get professor", () => {
    it("gets a professor", async () => {
      await Professor.create({ name: "foo", email: "foo@mail", password: "bar" });
      const foundProf = await Professor.findOne({ name: "foo" });
      expect(foundProf.name).toEqual("foo");
    });
  });

  describe("professor not found", () => {
    it("gets a non existent professor", async () => {
      const prof = await Professor.findOne({ name: "foo" });
      expect(prof).toEqual(null);
    });
  });

  describe("save professor", () => {
    it("saves a professor", async () => {
      const savedProf = await Professor.create({ name: "foo", email: "foo@mail", password: "bar" });
      expect(savedProf.name).toEqual("foo");
    });
  });

  describe("fields validation", () => {
    it("saves a professor with valid fields", async () => {
      const savedProf = await Professor.create({ name: "foo", email: "foo@mail", password: "bar", area: "Math" });
      expect(savedProf._id).toBeDefined();
      expect(savedProf.name).toBeDefined();
      expect(savedProf.email).toBeDefined();
      expect(savedProf.password).toBeDefined();
      expect(savedProf.area).toBeDefined();
    });
  });

  describe("invalid fields", () => {
    it("saves a professor with an invalid field", async () => {
      const savedProf = await Professor.create({ name: "foo", email: "foo@mail", password: "bar", area: "math", university: "mit" });
      expect(savedProf._id).toBeDefined();
      expect(savedProf.university).toBeUndefined();
    });
  });

  describe("required field missing", () => {
    it("tries to save a professor without a required field", async () => {
      let error;
      try {
        await Professor.create({ name: "foo" });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe("update professor", () => {
    it("updates a professor", async () => {
      const prof = await Professor.create({ name: "foo", email: "foo@mail", password: "bar" });
      prof.name = "bar";
      const updatedProf = await prof.save();
      expect(updatedProf.name).toEqual("bar");
    });
  });

  describe("try to update a professor", () => {
    it("updates a non existent professor", async () => {
      const prof = await Professor.create({ name: "foo", email: "foo@mail", password: "bar", area: "math" });
      await Professor.deleteOne({ _id: prof._id });
      let error;
      try {
        prof.area = "science";
        await prof.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
    });
  });

  describe("delete professor", () => {
    it("deletes a professor", async () => {
      const prof = await Professor({ name: "foo", email: "foo@mail", password: "bar" });
      await Professor.findOneAndDelete({ name: prof.name });
      const deletedProf = await Professor.findOne({ name: prof.name });
      expect(deletedProf).toEqual(null);
    });
  });
});