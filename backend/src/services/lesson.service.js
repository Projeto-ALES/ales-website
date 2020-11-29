const Lesson = require('../models/lesson');
const { ErrorHandler } = require('../helpers/error');

const getLessonsByCourseId = async courseId => {
  return await Lesson.find({
    course: courseId,
  }).populate('professors')
};

const getLessonById = async id => {
  return await Lesson.findById(id);
};

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
};

const deleteLesson = async id => {
  return await Lesson.findByIdAndDelete(id);
};

const updateLesson = async (id, body) => {
  try {
    return await Lesson.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getLessonsByCourseId,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
