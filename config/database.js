const pg = require("pg");
const utils = require("../utils/config");
const { Pool } = pg;

const connectionString = utils.pgConnectionString;

const pool = new Pool({ connectionString });

const createDbTable = async () => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  is_admin BOOLEAN NOT NULL,
  is_member BOOLEAN NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts(
  post_id SERIAL PRIMARY KEY,
  user_id INT,
  title VARCHAR (255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  post TEXT NOT NULL,
  CONSTRAINT fk_posts FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Users and posts table created successfully.");
  } catch (error) {
    console.error("Error on creating users and posts table,", error);
  }
};
const alterTable = async () => {
  try {
    await pool.query(
      "ALTER TABLE users ALTER COLUMN is_member TYPE VARCHAR (15);"
    );
  } catch (error) {
    console.error(
      "Error on altering is_member column from users table,",
      error
    );
  }
};

const connectToDb = async () => {
  try {
    const { rows } = await pool.query("SELECT version();");
    console.log(rows[0].version);
    console.log("Connected to database.");
  } catch (error) {
    console.error("Error on connecting to db:", error);
  }
};
connectToDb();
createDbTable();
// alterTable();

module.exports = new Pool({ connectionString });
