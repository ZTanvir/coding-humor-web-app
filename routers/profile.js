const express = require("express");
const profileRoute = express.Router();
const profileControllers = require("../controllers/profileControllers");

profileRoute.get("/:id", profileControllers.getProfile);
profileRoute.post("/update-membership", profileControllers.updateMemberShip);
profileRoute.post("/deny-membership", profileControllers.updateMemberShip);

module.exports = profileRoute;
