const express = require("express");
const authRouter = express.Router();
const cors = require("cors");
const { signup_post, login_post } = require("../controllers/auth.controller");

authRouter.options(
  "/signup",
  cors({ origin: "https://nabd-al-qalam.vercel.app/signup" })
);

authRouter.post(
  "/signup",
  cors({ origin: "https://nabd-al-qalam.vercel.app/signup" }),
  signup_post
);

authRouter.options(
  "/login",
  cors({
    origin: "https://nabd-al-qalam.vercel.app/login",
    preflightContinue: true,
  })
);

authRouter.post(
  "/login",
  cors({
    origin: "https://nabd-al-qalam.vercel.app/login",
    preflightContinue: true,
  }),
  login_post
);

module.exports = authRouter;
