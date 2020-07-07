const User = require("../models/user");
const { ErrorHandler } = require("../helpers/error");

exports.getUsers = async query => {
  return await User.find(query)
    .then(users => {
      return users;
    })
    .catch(() => {
      throw new ErrorHandler(500, "Error while fetching users");
    });
};

exports.createUser = async data => {
  const { email, name, password } = data;
  if (!email || !name || !password) {
    throw new ErrorHandler(400, "Required fields are missing");
  }
  return await User.create(data)
    .then(() => {
      return User.find({ email: data.email });
    })
    .catch(err => {
      if (err.code === 11000) {
        throw new ErrorHandler(409, err.errmsg);
      }
      throw new ErrorHandler(500, err.errmsg);
    });
};

exports.getUser = async params => {
  return await User.findById(params.id)
    .then(user => {
      if (!user) {
        throw Error("Not Found");
      }
      return user;
    })
    .catch(err => {
      if (err.message === "Not Found") {
        throw new ErrorHandler(404, err.message);
      }
      throw new ErrorHandler(500, err.errmsg);
    });
};

exports.deleteUser = async params => {
  return await User.findByIdAndDelete(params.id)
    .then(user => {
      if (!user) {
        throw Error("Not Found");
      }
      return;
    })
    .catch(err => {
      if (err.message === "Not Found") {
        throw new ErrorHandler(404, err.message);
      }
      throw new ErrorHandler(500, err.errmsg);
    });
};

exports.updateUser = async (params, data) => {
  return await User.updateOne({ _id: params.id }, { $set: data })
    .then(() => {
      return User.findOne({ _id: params.id });
    })
    .catch(err => {
      throw new ErrorHandler(500, err.errmsg);
    });
};
