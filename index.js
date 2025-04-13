const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./config/database");

const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  res.render("home", { title: "Coding Humor" });
});

module.exports = app;
