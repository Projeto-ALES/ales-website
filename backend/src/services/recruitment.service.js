const Recruitment = require('../models/recruitment');
const { ErrorHandler } = require('../helpers/error');

const getProcesses = async (params) => {
  return await Recruitment.find(params);
};

const createProcess = async (data) => {
  try {
    return await Recruitment.create(data);
  } catch (e) {
    // duplicated key error
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getProcessByName = async (name) => {
  try {
    return await Recruitment.findOne({ name });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteProcessByName = async (name) => {
  return await Recruitment.findOneAndDelete({ name });
};

const updateProcess = async (name, body) => {
  try {
    return await Recruitment.findOneAndUpdate({ name }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const addInterviews = async (name, interviews) => {
  try {
    await Recruitment.findOneAndUpdate(
      { name },
      { $push: { interviews: { $each: interviews } } },
      { new: true, useFindAndModify: false }
    );
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};


module.exports = {
  getProcesses,
  createProcess,
  getProcessByName,
  deleteProcessByName,
  updateProcess,
  addInterviews,
};