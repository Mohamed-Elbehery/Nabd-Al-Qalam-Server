const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if json web token exists & verified
  if (token) {
    jwt.verify(token, "mySecretKey", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirce("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirce("/login");
  }
};

module.exports = requireAuth;
