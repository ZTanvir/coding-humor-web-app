const userRoute = require("express").Router();
const userControllers = require("../controllers/usersControllers");

userRoute.get("/sign-up", userControllers.getUserRegistrationForm);
userRoute.post(
  "/sign-up",
  userControllers.signupValidator,
  userControllers.postUserRegistrationForm
);

userRoute.get("/sign-in", userControllers.getUserLoginForm);

module.exports = userRoute;
