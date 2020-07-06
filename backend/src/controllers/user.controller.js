const UserService = require("../services/user.service");

exports.getUsers = async (req, res, next) => {
  return await UserService.getUsers({})
    .then(users => {
      return res.status(200).json({
        status: 200,
        users,
      });
    })
    .catch(err => {
      return res.status(400).json({ status: 400, message: err.message });
    });
};

exports.createUser = async (req, res, next) => {
  return await UserService.createUser(req.body)
    .then(user => {
      return res.status(201).json({
        status: 201,
        user,
      });
    })
    .catch(err => {
      return res.status(400).json({ status: 400, message: err.message });
    });
};

exports.getUser = async (req, res, next) => {
  return await UserService.getUser(req.params)
    .then(user => {
      return res.status(200).json({
        status: 200,
        user,
      });
    })
    .catch(err => {
      return res.status(400).json({ status: 400, message: err.message });
    });
};
