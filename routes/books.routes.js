const express = require("express");
const router = express.Router();
const cors = require("cors");
const { books_index, books_add } = require("../controllers/books.controller");

router.get(
  "/",
  cors({ origin: "https://nabd-al-qalam.vercel.app" }),
  books_index
);

router.options(
  "/add-books",
<<<<<<< HEAD
  cors({ origin: "https://nabd-al-qalam.vercel.app", preflightContinue: true })
);
router.post(
  "/add-books",
  cors({
    origin: "https://nabd-al-qalam.vercel.app",
    preflightContinue: true,
  }),
=======
  cors({ origin: "https://nabd-al-qalam.vercel.app" })
);
router.post(
  "",
  cors({ origin: "https://nabd-al-qalam.vercel.app", preflightContinue: true, methods: ["GET", "POST"] }),
>>>>>>> 48550632828c0b36b4f02b9eec07eefaacd30e7d
  books_add
);

module.exports = router;
