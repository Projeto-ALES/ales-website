const Interview = require('../models/interview');
const { ErrorHandler } = require('../helpers/error');

const getInterviewById = async (id) => await Interview.findById(id);

const createInterview = async (data) => {
  try {
    return await Interview.create(data);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteInterview = async (id) => await Interview.findByIdAndDelete(id);

const updateInterview = async (id, body) => {
  try {
    return await Interview.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const createManyInterviews = async (interviews) => {
  try {
    return await Interview.insertMany(interviews);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getInterviewById,
  createInterview,
  deleteInterview,
  updateInterview,
  createManyInterviews,
};
