const db = require("../config/database");
const { body, validationResult } = require("express-validator");

const validatePost = [
  body("post_title")
    .not()
    .isEmpty()
    .withMessage("Please enter post title")
    .trim()
    .escape(),
  body("post_descriptions")
    .not()
    .isEmpty()
    .withMessage("Please add your post")
    .isLength({ max: 10 })
    .withMessage("Post must be within 1000 character.")
    .trim()
    .escape(),
];

const getPosts = async (req, res) => {
  const { rows } = await db.query(
    "SELECT username,post_id,title,created_at,post FROM users JOIN posts ON users.user_id=posts.user_id;"
  );
  const posts = [...rows];

  return res.render("pages/posts-page", { posts, errors: [], postData: {} });
};

const addPost = async (req, res) => {
  console.log("I am add post router", req.body);
  const { post_title, post_descriptions } = req.body;
  const { rows } = await db.query(
    "SELECT username,post_id,title,created_at,post FROM users JOIN posts ON users.user_id=posts.user_id;"
  );
  const posts = [...rows];

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("pages/posts-page", {
      posts,
      errors: errors.array(),
      postData: {
        post_title,
        post_descriptions,
      },
    });
  }
};

module.exports = { getPosts, addPost, validatePost };
