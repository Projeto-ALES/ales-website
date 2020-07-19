const User = require("../models/user");
const { ErrorHandler } = require("../helpers/error");

exports.getUserWithPassword = async email => {
  try {
    return await User.findOne({ email }).select("+password");
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};
