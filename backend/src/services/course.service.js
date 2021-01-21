const Course = require('../models/course');
const { ErrorHandler } = require('../helpers/error');

const getCourses = async (params) => await Course.find(params);

const createCourse = async (data) => {
  try {
    return await Course.create(data);
  } catch (e) {
    // duplicated key error
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getCourseById = async (id) => {
  try {
    return await Course.findById(id).populate(['professors', 'coordinator']).populate({ path: 'lessons', populate: { path: 'professors' } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteCourse = async (id) => await Course.findByIdAndDelete(id);

const updateCourse = async (id, body) => {
  try {
    return await Course.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const addLesson = async (id, lesson_id) => {
  try {
    return await Course.findOneAndUpdate(
      { _id: id },
      { $push: { lessons: lesson_id } },
      { new: true, useFindAndModify: false },
    );
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  deleteCourse,
  updateCourse,
  addLesson,
};
