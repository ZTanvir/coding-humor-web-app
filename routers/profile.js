const express = require("express");
const profileRoute = express.Router();
const profileControllers = require("../controllers/profileControllers");

profileRoute.get("/:id", profileControllers.getProfile);

module.exports = profileRoute;
