const Lesson = require("../models/lesson");
const { ErrorHandler } = require("../helpers/error");

const getLessonsBySubjectId = async (subjectId) => {
  return await Lesson.find();
}

const createLesson = async data => {
  try {
    return await Lesson.create(data);
  } catch (e) {
    // duplicated key error
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
}

module.exports = {
  createLesson,
};
