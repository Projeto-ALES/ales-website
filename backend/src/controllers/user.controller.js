const UserService = require("../services/user.service");

exports.getUsers = async (req, res, next) => {
  try {
    let users = await UserService.getUsers({});
    return res.status(200).json({
      status: 200,
      users,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let user = await UserService.createUser(req.body);
    return res.status(201).json({
      status: 201,
      user,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// router.post("/authenticate", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return res.status(400).send({ error: "User not found " });
//   }

//   if (!(await bcrypt.compare(password, user.password))) {
//     return res.status(401).send({ error: "Invalid Password" });
//   }

//   // Removes password from http response
//   user.password = undefined;

//   const token = jwt.sign(
//     { email: user.email, roles: user.roles, name: user.name },
//     SECRET_JWT_KEY,
//     {
//       expiresIn: 86400,
//     }
//   );
//   res.status(200).send({ user, token });
// });

// module.exports = app => app.use("/user", router);
