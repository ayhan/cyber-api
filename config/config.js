require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  postgreUrl: process.env.POSTGRES_URL,
};
