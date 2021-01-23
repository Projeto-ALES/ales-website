const Professor = require('../models/professor');
const { ErrorHandler } = require('../helpers/error');

const getProfessors = async (query) => {
  try {
    return await Professor.find(query);
  } catch (e) {
    throw new ErrorHandler(500, 'Error while fetching professors');
  }
};

const createProfessor = async (data) => {
  try {
    return await Professor.create(data);
  } catch (e) {
    // duplicated key error
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getProfessor = async (params) => {
  try {
    return await Professor.findOne(params);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getProfessorWithToken = async (params) => {
  try {
    return await Professor.findOne(params).select(['inviteToken', 'inviteTokenExp']);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteProfessor = async (id) => {
  try {
    return await Professor.findByIdAndDelete(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const updateProfessor = async (id, data) => {
  try {
    return await Professor.findOneAndUpdate({ _id: id }, { $set: data });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

module.exports = {
  getProfessors,
  createProfessor,
  getProfessor,
  getProfessorWithToken,
  deleteProfessor,
  updateProfessor,
};
