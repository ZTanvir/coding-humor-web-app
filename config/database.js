const pg = require("pg");
const utils = require("../utils/config");
const { Pool } = pg;

const connectionString = utils.pgConnectionString;
console.log(connectionString);

const pool = new Pool({ connectionString });

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
module.exports = new Pool({ connectionString });
