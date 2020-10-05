const {
  getSubjects,
  getSubjectsById,
  deleteSubject,
  createSubject,
  updateSubject,
} = require("../subject.service");

const Subject = require("../../models/subject");
jest.mock("../../models/subject");

describe("Subject service", () => {
  Subject.find = jest.fn();
  Subject.findById = jest.fn();
  Subject.findByIdAndDelete = jest.fn();
  Subject.create = jest.fn();
  Subject.findOneAndUpdate = jest.fn();

  const params = {
    id: "test_id",
    name: "Test Name",
  };

  describe("getSubjects", () => {
    it("should call Subject.find with correct params", () => {
      getSubjects();
      expect(Subject.find).toHaveBeenCalledWith();
      expect(Subject.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("getSubject", () => {
    it("should call Subject.findById with correct params", () => {
      getSubjectsById(params.id);
      expect(Subject.findById).toHaveBeenCalledWith(params.id);
      expect(Subject.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteSubject", () => {
    it("should call Subject.findByIdAndDelete with correct params", () => {
      deleteSubject(params.id);
      expect(Subject.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(Subject.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("createSubject", () => {
    it("should call Subject.create with correct params", () => {
      createSubject(params);
      expect(Subject.create).toHaveBeenCalledWith(params);
      expect(Subject.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateSubject", () => {
    it("should call Subject.findOneAndUpdate with correct params", () => {
      updateSubject(params.id, params);
      expect(Subject.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: params.id },
        { $set: { ...params } }
      );
      expect(Subject.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
