const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL database information
// const pool = new Pool({
//   user: "ayhan",
//   host: "localhost",
//   database: "postgres",
//   password: "pass",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Export database connection
module.exports = {
  query: (text, params) => pool.query(text, params),
};
