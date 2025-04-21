const { body, validationResult } = require("express-validator");
const db = require("../config/database");
const bcrypt = require("bcryptjs");

const signupValidator = [
  body("username", "Username can't be empty.").not().isEmpty(),
  body("password", "The minimum password length is 6 characters.").isLength({
    min: 6,
  }),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password don't match."),
  body("fname", "First name can't be empty.").not().isEmpty(),
  body("lname", "Last name can't be empty.").not().isEmpty(),
];

const getUserRegistrationForm = async (req, res) => {
  res.render("../views/pages/registration-page", { errors: [] });
};

const postUserRegistrationForm = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    const { username, password, fname, lname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await db.query(
        "INSERT INTO users(first_name,last_name,username,password,is_admin,is_member) VALUES($1,$2,$3,$4,$5,$6)",
        [fname, lname, username, hashPassword, false, false]
      );
    } catch (error) {
      console.log("Error while adding user to users table", error);
    }

    return res.status(200).json({ form: req.body });
  }
  res.render("../views/pages/registration-page", {
    errors: errors["errors"],
  });
};

module.exports = {
  getUserRegistrationForm,
  postUserRegistrationForm,
  signupValidator,
};
