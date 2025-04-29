const express = require("express");
const postRoutes = express.Router();

postRoutes.get("/posts", (req, res) => {
  return res.render("");
});

module.exports = postRoutes;
