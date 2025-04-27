const userRoute = require("express").Router();
const userControllers = require("../controllers/usersControllers");
const passportConfig = require("../config/passport");
const passport = require("passport");

userRoute.get("/sign-up", userControllers.getUserRegistrationForm);
userRoute.post(
  "/sign-up",
  userControllers.signupValidator,
  userControllers.postUserRegistrationForm
);

userRoute.get("/sign-in", userControllers.getUserLoginForm);
userRoute.post(
  "/sign-in",
  userControllers.signInValidator,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/sign-up",
  }),
  userControllers.postUserLoginForm
);

userRoute.get("/sign-out", userControllers.logOut);

module.exports = userRoute;
