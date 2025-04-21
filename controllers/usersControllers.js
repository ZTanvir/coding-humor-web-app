const getUserRegistrationForm = async (req, res) => {
  res.render("../views/pages/registration-page", {});
};

const postUserRegistrationForm = async (req, res) => {};

module.exports = { getUserRegistrationForm, postUserRegistrationForm };
