const express = require("express");
const morgan = require("morgan");
const db = require("./config/database");

const app = express();
app.use(morgan("dev"));

module.exports = app;
