const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { ErrorHandler } = require("../helpers/error");

exports.getUsers = async query => {
  try {
    return await User.find(query);
  } catch (e) {
    throw new ErrorHandler(500, "Error while fetching users");
  }
};

exports.createUser = async data => {
  try {
    return await User.create(data);
  } catch (e) {
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.getUser = async id => {
  try {
    return await User.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.deleteUser = async params => {
  try {
    return await User.findByIdAndDelete(params.id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.updateUser = async (id, data) => {
  try {
    await User.updateOne({ _id: id }, { $set: data });
    return await User.findOne({ _id: id });
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

exports.isOwner = (idParam, token) => {
  try {
    const { TOKEN_SECRET } = process.env;
    const { id } = jwt.verify(token, TOKEN_SECRET);

    if (idParam === id) {
      return true;
    }
    return false;
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};
