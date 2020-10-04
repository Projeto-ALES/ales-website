const {
  getProfessors,
  createProfessor,
  getProfessor,
  deleteProfessor,
  updateProfessor,
} = require("../professor.service");

const Professor = require("../../models/professor");
jest.mock("../../models/professor");

describe("Professor service", () => {
  Professor.find = jest.fn();
  Professor.create = jest.fn();
  Professor.findById = jest.fn();
  Professor.findByIdAndDelete = jest.fn();
  Professor.findOneAndUpdate = jest.fn();

  const params = {
    id: "test_id",
    name: "Test Name",
    email: "test@mail.com",
  };

  describe("getProfessors", () => {
    it("should call Professor.find with correct params", () => {
      getProfessors(params);
      expect(Professor.find).toHaveBeenCalledWith(params);
      expect(Professor.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("createProfessor", () => {
    it("should call Professor.create with correct params", () => {
      createProfessor(params);
      expect(Professor.create).toHaveBeenCalledWith(params);
      expect(Professor.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("getProfessor", () => {
    it("should call Professor.findById with correct params", () => {
      getProfessor(params.id);
      expect(Professor.findById).toHaveBeenCalledWith(params.id);
      expect(Professor.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteProfessor", () => {
    it("should call Professor.findByIdAndDelete with correct params", () => {
      deleteProfessor(params.id);
      expect(Professor.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(Professor.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateProfessor", () => {
    it("should call Professor.findOneAndUpdate with correct params", () => {
      updateProfessor(params.id, params);
      expect(Professor.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: params.id },
        { $set: params }
      );
      expect(Professor.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
