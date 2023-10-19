// Imports
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const routes = require("./routes/books.routes");
const authRouter = require("./routes/auth.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.routes");
const { connectToDB } = require("./utils/db");
require("dotenv").config();

// Initialize App and Listen to the PORT
const app = express();
// const whitelistedDomains = [
//   "http://127.0.0.1:5500/",
//   "https://nabd-al-qalam.vercel.app/",
//   "https://nabd-al-qalam.vercel.app/books",
//   "https://nabd-al-qalam.vercel.app/login",
//   "https://nabd-al-qalam.vercel.app/signup",
//   "https://nabd-al-qalam.vercel.app/add-books",
// ];

// Static Files and Middlewares
app.use(express.static("public"));
app.use(morgan("dev"));
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (whitelistedDomains.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },

//     // origin: "https://nabd-al-qalam.vercel.app/books",
//     // methods: ["GET", "POST"],
//   })
// );

//TODO Parse Body and Configure the limit size of the data
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

try {
  app.listen(process?.env?.PORT || 3000, () => {
    connectToDB();
  });
} catch (error) {
  console.error("Server Connection Failed", error);
}

app.use("/", routes);
app.use("/", authRouter);
app.use("/", usersRouter);
