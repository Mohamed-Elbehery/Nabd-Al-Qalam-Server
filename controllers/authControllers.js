const User = require("../models/auth");
const jwt = require("jsonwebtoken")
const maxAge = 3 * 24 * 60 * 60;

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
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000});
    res.status(201).json({ user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

const createToken = (id) => {
  /*
    todo =>    jwt.sign({
    todo =>      payload: value,
    todo =>      secret: value,
    todo =>      options: value,
    todo =>    })

    !     this will return the signature token
  */

  return jwt.sign({ id }, 'mySecretKey', {
    expiresIn: maxAge
  })
}

const login_post = async (req, res) => {};

module.exports = { signup_post, login_post };
