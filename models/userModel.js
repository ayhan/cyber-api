const bcrypt = require("bcryptjs");

const users = [];

module.exports = {
  async createUser(username, password) {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: Date.now(), username, password: hashedPassword };
      users.push(user);
      return user;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async findUserByUsername(username) {
    return users.find((user) => user.username === username);
  },
};
