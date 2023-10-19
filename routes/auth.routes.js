const express = require("express");
const authRouter = express.Router();
const cors = require("cors");
const { signup_post, login_post } = require("../controllers/auth.controller");

authRouter.post("/signup", cors(), signup_post);
authRouter.post("/login", cors(), login_post);

module.exports = authRouter;
