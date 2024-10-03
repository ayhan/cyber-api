const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ error: "Token is required" });

  const bearerToken = token.split(" ")[1]; // Split 'Bearer'

  jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
