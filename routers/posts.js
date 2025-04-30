const express = require("express");
const postRoutes = express.Router();
const postControllers = require("../controllers/postControllers");

postRoutes.get("/posts", postControllers.getPosts);

module.exports = postRoutes;
