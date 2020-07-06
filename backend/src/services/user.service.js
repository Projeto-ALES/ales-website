const User = require("../models/user");

exports.getUsers = async query => {
  try {
    let users = await User.find(query);
    return users;
  } catch (e) {
    throw Error("Error while Paginating Users");
  }
};

exports.createUser = async data => {
  try {
    let user = await User.create(data).then(() => {
      return User.find({ email: data.email });
    });
    return user;
  } catch (e) {
    throw Error("Error while creating user");
  }
};
