const Professor = require("../models/professor");
const { ErrorHandler } = require("../helpers/error");

exports.getProfessors = async query => {
  try {
    return await Professor.find(query);
  } catch (e) {
    throw new ErrorHandler(500, "Error while fetching professors");
  }
};
