const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Split 'Bearer'

  if (!token) return res.status(403).json({ error: "Token is required" });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
