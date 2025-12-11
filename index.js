const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { decode } = require("html-entities");
const expressSession = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(expressSession);
const db = require("./config/database");
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");
const profileRouter = require("./routers/profile");
const config = require("./utils/config");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));

app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
app.use(passport.authenticate("session"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/auth", usersRouter);
app.use("/posts", postsRouter);
app.use("/profile", profileRouter);

app.get("/", async (req, res) => {
  let posts = [];
  try {
    // shuffle post
    const { rows } = await db.query(
      "SELECT post FROM posts ORDER BY RANDOM() LIMIT 3;"
    );
    posts = [...rows];
    posts = posts.map((p) => {
      return { ...p, post: decode(p.post) };
    });
  } catch (error) {
    console.log("Error on getting posts from posts table ", error);
  }

  res.render("home", { title: "Coding Humor", posts });
});

app.get("/version", (req, res) => {
  res.send("1");
});

module.exports = app;
