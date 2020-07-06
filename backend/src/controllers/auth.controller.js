const AuthService = require("../services/auth.service");

exports.auth = async (req, res, next) => {
  return await AuthService.getToken(req.body)
    .then(response => {
      const { user, token, refreshToken } = response;
      return res.status(200).json({
        status: 200,
        user,
        token,
        refreshToken,
      });
    })
    .catch(err => {
      return res.status(400).json({ status: 400, message: err.message });
    });
};

exports.refresh = async (req, res, next) => {
  return await AuthService.refreshToken(req.headers.authorization)
    .then(response => {
      const { token } = response;
      return res.status(200).json({
        status: 200,
        token,
      });
    })
    .catch(err => {
      return res.status(400).json({ status: 400, message: err.message });
    });
};
