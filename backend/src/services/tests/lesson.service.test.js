const {
  getLessonsByCourseId,
  getLessonById,
  createLesson,
  deleteLesson,
  updateLesson,
} = require("../lesson.service");

const Lesson = require("../../models/lesson");
jest.mock("../../models/lesson");

describe("Lesson service", () => {
  Lesson.find = jest.fn();
  Lesson.findById = jest.fn();
  Lesson.create = jest.fn();
  Lesson.findByIdAndDelete = jest.fn();
  Lesson.findOneAndUpdate = jest.fn();

  const params = {
    id: "lesson_id",
    name: "lesson_name",
    course: {
      id: "course_id",
    },
  };

  describe("getLessonsByCourseId", () => {
    it("should call Lesson.find with correct params", async () => {
      await getLessonsByCourseId(params.course.id);
      expect(Lesson.find).toHaveBeenCalledWith({ course: params.course.id });
      expect(Lesson.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLessonById", () => {
    it("should call Lesson.findById with correct params", async () => {
      await getLessonById(params.id);
      expect(Lesson.findById).toHaveBeenCalledWith(params.id);
      expect(Lesson.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createLesson", () => {
    it("should call Lesson.create with correct params", async () => {
      await createLesson(params);
      expect(Lesson.create).toHaveBeenCalledWith(params);
      expect(Lesson.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteLesson", () => {
    it("should call Lesson.findByIdAndDelete with correct params", async () => {
      await deleteLesson(params.id);
      expect(Lesson.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(Lesson.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateLesson", () => {
    it("should call Lesson.findOneAndUpdate with correct params", async () => {
      await updateLesson(params.id, params);
      expect(Lesson.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: params.id },
        { $set: { ...params } }
      );
      expect(Lesson.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
