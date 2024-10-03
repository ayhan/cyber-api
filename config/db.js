const { Pool } = require("pg");

// PostgreSQL database information
const pool = new Pool({
  user: "ayhan",
  host: "localhost",
  database: "postgres",
  password: "pass",
  port: 5432,
});

// Export database connection
module.exports = {
  query: (text, params) => pool.query(text, params),
};
