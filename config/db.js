const { Pool } = require("pg");
const { postgreUrl } = require("../config/config");

const pool = new Pool({
  connectionString: postgreUrl,
});

// Export database connection
module.exports = {
  query: (text, params) => pool.query(text, params),
};
