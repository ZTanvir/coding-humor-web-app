require("dotenv").config();
let pgConnectionString = null;
if (process.env.NODE_ENV === "developmentLocal") {
  pgConnectionString = process.env.PG_CONNECTION_STRING;
} else if (process.env.NODE_ENV === "developmentVercel") {
  pgConnectionString = process.env.VERCEL_DATABASE_URL;
} else if (process.env.NODE_ENV === "production") {
  pgConnectionString = process.env.VERCEL_DATABASE_URL;
}
const port = process.env.PORT;

const FOO_COOKIE_SECRET = process.env.FOO_COOKIE_SECRET;

module.exports = { pgConnectionString, port, FOO_COOKIE_SECRET };
