const User = require("../models/user");
const { ErrorHandler } = require("../helpers/error");

exports.getUserWithPassword = async params => {
  try {
    return await User.findOne(params).select("+password");
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.getUserWithPasswordToken = async params => {
  try {
    return await User.findOne(params).select([
      "password",
      "passwordToken",
      "passwordTokenExp",
    ]);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};
