const User = require("../models/user");

exports.getUsers = async query => {
  return await User.find(query)
    .then(users => {
      return users;
    })
    .catch(err => {
      throw Error(err.message);
    });
};

exports.createUser = async data => {
  return await User.create(data)
    .then(() => {
      return User.find({ email: data.email });
    })
    .catch(err => {
      throw Error(err.message);
    });
};

exports.getUser = async params => {
  return await User.findOne({ _id: params.id })
    .then(user => {
      return user;
    })
    .catch(err => {
      throw Error(err.message);
    });
};
