const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./database");
const bcryptjs = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
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
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id=$1", [
      user_id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(err);
  }
});
