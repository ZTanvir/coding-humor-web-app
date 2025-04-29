const express = require("express");
const postRoutes = express.Router();

postRoutes.get("/posts", (req, res) => {
  console.log(res.locals.currentUser);

  return res.render("pages/posts-page");
});

module.exports = postRoutes;
