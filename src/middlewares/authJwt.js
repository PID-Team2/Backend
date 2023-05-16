const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
    return res.status(401).send({ message: "No authorization header provided" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return res.status(401).send({ message: "Invalid authorization header format. Use 'Bearer <token>'" });
    }

    const token = parts[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;