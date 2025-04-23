const { body, validationResult } = require("express-validator");
const db = require("../config/database");
const bcrypt = require("bcryptjs");

const signupValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username can't be empty.")
    .custom(async (value, { req }) => {
      const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [
        req.body.username,
      ]);
      if (rows.length > 0) {
        throw new Error("User already exists.");
      }
    }),
  body("password", "The minimum password length is 6 characters.").isLength({
    min: 6,
  }),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters.")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Confirm Password don't match with password."),
  body("fname", "First name can't be empty.").not().isEmpty(),
  body("lname", "Last name can't be empty.").not().isEmpty(),
];

const getUserRegistrationForm = async (req, res) => {
  return res.render("../views/pages/registration-page", {
    errors: [],
    formData: {},
  });
};

const postUserRegistrationForm = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  const { username, password, fname, lname } = req.body;

  if (errors.isEmpty()) {
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

    return res.redirect("/");
  }
  return res.render("../views/pages/registration-page", {
    errors: errors["errors"],
    formData: {
      username,
      password,
      confirmPassword: req.body.confirmPassword,
      fname,
      lname,
    },
  });
};

const signInValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Please enter your username.")
    .custom(async (value, { req }) => {
      const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [
        req.body.username,
      ]);
      if (rows.length === 0) {
        throw new Error("Incorrect username.");
      }
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter your password.")
    .custom(async (value, { req }) => {
      let isUserValid = false;
      const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [
        req.body.username,
      ]);
      if (rows.length > 0) {
        isUserValid = true;
      }

      if (isUserValid) {
        const { rows } = await db.query(
          "SELECT password FROM users WHERE username=$1",
          [req.body.username]
        );
        const encryptedPassword = rows[0].password;

        const comparePassword = await bcrypt.compare(
          req.body.password,
          encryptedPassword
        );

        if (!comparePassword) {
          throw new Error("Incorrect password.");
        }
      }
    }),
];

const getUserLoginForm = (req, res) => {
  return res.render("../views/pages/login-page", {
    errors: [],
    formData: {},
  });
};
const postUserLoginForm = (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;

  if (errors.isEmpty()) {
  }
  return res.render("../views/pages/login-page", {
    errors: errors["errors"],
    formData: { username, password },
  });
};

module.exports = {
  getUserRegistrationForm,
  postUserRegistrationForm,
  signupValidator,
  getUserLoginForm,
  postUserLoginForm,
  signInValidator,
};
