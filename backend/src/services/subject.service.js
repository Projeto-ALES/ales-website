const Subject = require("../models/subject");
const { ErrorHandler } = require("../helpers/error");

const getSubjects = async () => {
  return await Subject.find();
};

const getSubjectsById = async id => {
  return await Subject.findById(id)
    .populate("professors")
    .populate("coordinator");
};

const deleteSubject = async id => {
  return await Subject.findByIdAndDelete(id);
};

const createSubject = async data => {
  try {
    return await Subject.create(data);
  } catch (e) {
    // duplicated key error
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

const updateSubject = async (id, body) => {
  try {
    return await Subject.findOneAndUpdate({ _id: id }, { $set: { ...body } });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getSubjects,
  getSubjectsById,
  deleteSubject,
  createSubject,
  updateSubject,
};
