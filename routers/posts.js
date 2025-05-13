const express = require("express");
const postRoutes = express.Router();
const postControllers = require("../controllers/postControllers");

postRoutes.get("/", postControllers.getPosts);

postRoutes.post("/", postControllers.validatePost, postControllers.addPost);

postRoutes.delete("/delete-post/:id", postControllers.deletePost);

module.exports = postRoutes;
