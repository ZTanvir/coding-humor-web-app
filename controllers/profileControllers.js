const db = require("../config/database");

const getProfile = async (req, res) => {
  const userId = req.params.id;
  let userData = null;
  let posts = null;
  let updateMembershipRequest = null;

  // check the answer to update membership status
  const { riddle_answer } = req.query;
  console.log({ riddle_answer }, res.locals.currentUser);
  if (riddle_answer) {
    const currentLoginUserId = res.locals.currentUser.user_id;
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

  // Get user data of userId
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id=$1", [
      userId,
    ]);
    userData = rows[0];
  } catch (error) {
    console.log("Error while getting users table data:", error);
  }

  // Get post created by userId
  try {
    const { rows } = await db.query("SELECT * FROM posts WHERE user_id=$1", [
      userId,
    ]);
    posts = [...rows];
  } catch (error) {
    console.log("Error while getting posts table data:", error);
  }

  // Get list of membership request when the user is admin
  if (userData.is_admin === true) {
    try {
      const { rows } = await db.query(
        "SELECT user_id,username FROM users WHERE is_member=$1",
        ["pending"]
      );
      updateMembershipRequest = [...rows];
    } catch (error) {
      console.log(
        "Error while getting is_member='false' from users table:",
        error
      );
    }
  }

  res.render("../views/pages/profile-page", {
    userData,
    posts,
    updateMembershipRequest,
  });
};

const updateMemberShip = async (req, res) => {
  console.log("I am updateMemberShip route");

  console.log("request body:", req.body);
  const { userId, userName } = req.body;
};

module.exports = { getProfile, updateMemberShip };
