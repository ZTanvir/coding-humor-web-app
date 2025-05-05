const db = require("../config/database");

const getProfile = async (req, res) => {
  const useId = req.params.id;
  let userData = null;
  let posts = null;

  // check the answer to update membership status
  const { riddle_answer } = req.query;
  console.log({ riddle_answer }, res.locals.currentUser);
  if (riddle_answer) {
    const currentLoginUserId = res.locals.currentUser.userId;
    try {
      // change isMember status in users table
      const result = await db.query(
        "UPDATE users SET is_member = 'pending' WHERE user_id=$1;",
        [currentLoginUserId]
      );
      console.log("Rows updated:", result.rowCount);
    } catch (error) {
      console.log("Error while updating is_member row in user table:", error);
    }
  }

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
    posts = [...rows];
  } catch (error) {
    console.log("Error while getting posts table data:", error);
  }

  res.render("../views/pages/profile-page", { userData, posts });
};

module.exports = { getProfile };
