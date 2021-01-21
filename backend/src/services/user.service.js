const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');

const getUsers = async (query) => {
  try {
    return await User.find(query);
  } catch (e) {
    throw new ErrorHandler(500, 'Error while fetching users');
  }
};

const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (e) {
    if (e.code === 11000) {
      throw new ErrorHandler(409, e.errmsg);
    }
    throw new ErrorHandler(500, e.errmsg);
  }
};

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const updateUser = async (id, data) => {
  try {
    await User.updateOne({ _id: id }, { $set: data });
    return await User.findById(id);
  } catch (e) {
    throw new ErrorHandler(500, e.errmsg);
  }
};

const isOwner = (idParam, token) => {
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

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  isOwner,
};
