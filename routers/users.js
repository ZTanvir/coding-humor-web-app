const userRoute = require("express").Router();
const userControllers = require("../controllers/usersControllers");

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
  userControllers.postUserLoginForm
);

module.exports = userRoute;
