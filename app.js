// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/booksRoutes");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize App and Listen to the PORT
const app = express();

// Static Files and Middlewares
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());

//TODO Parse Body and Configure the limit size of the data
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log(`Connected to DB`);
    try {
      app.listen(process?.env?.PORT || 3000, () => {
        console.log(
          `Server Running On http://localhost:${process?.env?.PORT || 3000}`
        );
      });
    } catch (_) {
      console.error("Server Connection Failed");
    }
  })
  .catch((_) => {
    console.error("Database Connection Failed");
  });

app.use("/", routes);
app.use("/", authRouter);

app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("You Got the Cookies!!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  res.json(cookies);
});
