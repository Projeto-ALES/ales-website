const jwt = require("jsonwebtoken");

const { SECRET_JWT_KEY } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No Token provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Invalid Token" });
  }

  const [scheme, token] = parts;

  // We expecting a Authorization header of type "Bearer <TOKEN>"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Invalid Token" });
  }

  jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
    if (err) res.status(401).send({ error: "Invalid Token" });

    req.authContext = {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    };
    return next();
  });
};
