const { Pool } = require("pg");
const { postgreUrl } = require("../config/config");

// local connection
// const pool = new Pool({
//   user: "ayhan",
//   host: "localhost",
//   database: "postgres",
//   password: "pass",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: postgreUrl,
});

// Export database connection
module.exports = {
  query: (text, params) => pool.query(text, params),
};
