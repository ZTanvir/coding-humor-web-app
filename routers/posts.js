const express = require("express");
const postRoutes = express.Router();
const postControllers = require("../controllers/postControllers");

postRoutes.get("/posts", postControllers.getPosts);

postRoutes.post(
  "/posts",
  postControllers.validatePost,
  postControllers.addPost
);

module.exports = postRoutes;
