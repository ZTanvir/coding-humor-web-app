require("dotenv").config();
const pgConnectionString = process.env.PG_CONNECTION_STRING;
const port = process.env.PORT;

module.exports = { pgConnectionString, port };
