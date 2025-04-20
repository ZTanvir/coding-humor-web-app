const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./config/database");
const usersRouter = require("./routers/users");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));

app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/auth", usersRouter);

app.get("/", async (req, res) => {
  res.render("home", { title: "Coding Humor" });
});

module.exports = app;
