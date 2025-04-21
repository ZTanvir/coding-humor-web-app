const userRoute = require("express").Router();
const userControllers = require("../controllers/usersControllers");

userRoute.get("/sign-up", userControllers.getUserRegistrationForm);
userRoute.post("/sign-up", userControllers.postUserRegistrationForm);

module.exports = userRoute;
