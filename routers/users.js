const userRoute = require("express").Router();
const userControllers = require("../controllers/usersControllers");

userRoute.get("/sign-up", userControllers.getUserRegistrationForm);

module.exports = userRoute;
