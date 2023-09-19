const User = require("../models/auth");

// Handling Errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // Duplicate Error Code (not unique email)
  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  // Validating Errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

const login_post = async (req, res) => {};

module.exports = { signup_post, login_post };
