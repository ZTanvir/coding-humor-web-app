const db = require("../config/database");

const getPosts = async (req, res) => {
  const { rows } = await db.query(
    "SELECT username,post_id,title,created_at,post FROM users JOIN posts ON users.user_id=posts.user_id;"
  );
  const posts = [...rows];

  return res.render("pages/posts-page", { posts });
};

module.exports = { getPosts };
