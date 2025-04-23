const express = require("express");
const morgan = require("morgan");
const path = require("path");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const db = require("./config/database");
const usersRouter = require("./routers/users");
const config = require("./utils/config");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));

app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    store: new pgSession({
      pool: db, // Connection pool
      tableName: "session", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: config.FOO_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
    saveUninitialized: false,
  })
);

app.use("/auth", usersRouter);

app.get("/", async (req, res) => {
  res.render("home", { title: "Coding Humor" });
});

module.exports = app;
