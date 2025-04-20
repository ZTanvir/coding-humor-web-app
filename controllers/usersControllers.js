const getUserRegistrationForm = async (req, res) => {
  console.log("sign up router");

  res.render("../views/pages/registration-page", {});
};
module.exports = { getUserRegistrationForm };
