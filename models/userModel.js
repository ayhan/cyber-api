const bcrypt = require("bcryptjs");
const db = require("../config/db");

module.exports = {
  async createUser(username, password) {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (existingUser.rows.length > 0) {
        throw new Error("Registration failed");
      }

      const result = await db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async findUserByUsername(username) {
    try {
      const result = await db.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error while fetching user");
    }
  },
};
