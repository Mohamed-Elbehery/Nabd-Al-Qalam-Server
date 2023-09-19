const express = require("express");
const authRouter = express.Router();
const { signup_post, login_post } = require("../controllers/authControllers");

authRouter.post("/signup", signup_post);
authRouter.post("/login", login_post);

module.exports = authRouter;
