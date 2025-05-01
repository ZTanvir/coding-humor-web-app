const db = require("../config/database");

const getProfile = async (req, res) => {
  const useId = req.params.id;
  let userData = null;
  let posts = null;
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id=$1", [
      useId,
    ]);
    userData = rows[0];
  } catch (error) {
    console.log("Error while getting users table data:", error);
  }

  try {
    const { rows } = await db.query("SELECT * FROM posts WHERE user_id=$1", [
      useId,
    ]);
    console.log("post rows,", rows);

    posts = [...rows];
  } catch (error) {
    console.log("Error while getting posts table data:", error);
  }
  console.log(userData, posts);

  res.render("../views/pages/profile-page", { userData, posts });
};

module.exports = { getProfile };
