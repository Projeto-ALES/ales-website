const Professor = require("../models/professor");
const { ErrorHandler } = require("../helpers/error");

exports.getProfessors = async query => {
  try {
    return await Professor.find(query);
  } catch (e) {
    throw new ErrorHandler(500, "Error while fetching professors");
  }
};

exports.createProfessor = async data => {
  try {
    return await Professor.create(data);
  } catch (e) {
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.getProfessor = async id => {
  try {
    return await Professor.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};
