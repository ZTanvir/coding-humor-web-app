const db = require("../config/database");
const { body, validationResult } = require("express-validator");
const { decode } = require("html-entities");

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
    .isLength({ max: 250 })
    .withMessage("Post must be within 250 character.")
    .trim()
    .escape(),
];

const getPosts = async (req, res) => {
  const { rows } = await db.query(
    "SELECT username,post_id,title,created_at,post FROM users JOIN posts ON users.user_id=posts.user_id;"
  );
  let posts = [...rows];
  // decode post so html entires replace by their value
  posts = posts.map((p) => {
    return { ...p, post: decode(p.post) };
  });

  return res.render("pages/posts-page", { posts, errors: [], postData: {} });
};

const addPost = async (req, res) => {
  const errors = validationResult(req);
  let posts = [];
  const userId = res.locals.currentUser.user_id;
  const { post_title, post_descriptions } = req.body;

  try {
    const { rows } = await db.query(
      "SELECT username,post_id,title,created_at,post FROM users JOIN posts ON users.user_id=posts.user_id;"
    );
    posts = [...rows];
  } catch (error) {
    console.error("Error on getting post from posts table:", error);
  }

  // decode post so html entires replace by their value
  posts = posts.map((p) => {
    return { ...p, post: decode(p.post) };
  });

  if (!errors.isEmpty()) {
    return res.render("pages/posts-page", {
      posts,
      errors: errors.array(),
      postData: {
        post_title: decode(post_title),
        post_descriptions: decode(post_descriptions),
      },
    });
  }

  // add post to posts table
  try {
    const result = await db.query(
      "INSERT INTO posts(user_id,title,post) VALUES ($1,$2,$3)",
      [userId, post_title, post_descriptions]
    );
    console.log("Rows updated:", result.rowCount);
  } catch (error) {
    console.error("Error on adding data to posts table:", error);
  }

  return res.render("pages/posts-page", {
    posts,
    errors: errors.array(),
    postData: {},
  });
};

module.exports = { getPosts, addPost, validatePost };
