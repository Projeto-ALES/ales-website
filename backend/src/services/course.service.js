const Course = require('../models/course');
const { ErrorHandler } = require('../helpers/error');

const getCourses = async () => {
  return await Course.find();
};

const getCoursesById = async id => {
  return await Course.findById(id)
    .populate('professors')
    .populate('coordinator');
};

const deleteCourse = async id => {
  return await Course.findByIdAndDelete(id);
};

const createCourse = async data => {
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

const updateCourse = async (id, body) => {
  try {
    return await Course.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getCourses,
  getCoursesById,
  deleteCourse,
  createCourse,
  updateCourse,
};
