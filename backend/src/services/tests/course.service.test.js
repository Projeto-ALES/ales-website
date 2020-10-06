const {
  getCourses,
  getCoursesById,
  deleteCourse,
  createCourse,
  updateCourse,
} = require("../course.service");

const Course = require("../../models/course");
jest.mock("../../models/course");

describe("Course service", () => {
  Course.find = jest.fn();
  Course.findById = jest.fn();
  Course.findByIdAndDelete = jest.fn();
  Course.create = jest.fn();
  Course.findOneAndUpdate = jest.fn();

  const params = {
    id: "test_id",
    name: "Test Name",
  };

  describe("getCourses", () => {
    it("should call Course.find with correct params", () => {
      getCourses();
      expect(Course.find).toHaveBeenCalledWith();
      expect(Course.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCourse", () => {
    it("should call Course.findById with correct params", () => {
      getCoursesById(params.id);
      expect(Course.findById).toHaveBeenCalledWith(params.id);
      expect(Course.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteCourse", () => {
    it("should call Course.findByIdAndDelete with correct params", () => {
      deleteCourse(params.id);
      expect(Course.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(Course.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("createCourse", () => {
    it("should call Course.create with correct params", () => {
      createCourse(params);
      expect(Course.create).toHaveBeenCalledWith(params);
      expect(Course.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateCourse", () => {
    it("should call Course.findOneAndUpdate with correct params", () => {
      updateCourse(params.id, params);
      expect(Course.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: params.id },
        { $set: { ...params } }
      );
      expect(Course.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
