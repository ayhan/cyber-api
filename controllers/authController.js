const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret, jwtExpiresIn } = require("../config/config");
const userModel = require("../models/userModel");

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    const user = await userModel.createUser(username, password);
    res.json({ message: "User created", user });
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);

    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );

    res.json({ message: "Login successful", token });
  },
};
