const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret, jwtExpiresIn } = require("../config/config");
const userModel = require("../models/userModel");

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const user = await userModel.createUser(username, password);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "Registration failed") {
        res.status(400).json({ error: "Registration failed" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      const user = await userModel.findUserByUsername(username);

      if (!user) {
        return res.status(400).json({ error: "Check your credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const access_token = jwt.sign(
        { id: user.id, username: user.username },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
      );

      res.json({ message: "Login successful", access_token });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  },
};
