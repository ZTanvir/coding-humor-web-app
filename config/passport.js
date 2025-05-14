const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./database");
const bcryptjs = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.error("I am in local passport");
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [
        username,
      ]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }
      const comparePassword = await bcryptjs.compare(password, user.password);

      if (!comparePassword) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id=$1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});
