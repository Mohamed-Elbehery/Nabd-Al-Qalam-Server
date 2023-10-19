const express = require("express");
const usersRouter = express.Router();
const cors = require("cors");
const { users_get, users_get_one } = require("../controllers/users.controller");

usersRouter.get("/users", cors(), users_get);
usersRouter.get("/users/:id", cors(), users_get_one);

module.exports = usersRouter;
