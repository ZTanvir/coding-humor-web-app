require("dotenv").config();
const pgConnectionString = process.env.PG_CONNECTION_STRING;
const port = process.env.PORT;

const FOO_COOKIE_SECRET = process.env.FOO_COOKIE_SECRET;

module.exports = { pgConnectionString, port, FOO_COOKIE_SECRET };
