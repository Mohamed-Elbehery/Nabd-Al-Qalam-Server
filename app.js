// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/ecommerceRoutes");
require("dotenv").config();

// Initialize App and Listen to the PORT
const app = express();

// Static Files and Middlewares
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
//TODO Don't Forget That
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(bodyParser.json());

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
