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
  cors({ origin: "https://nabd-al-qalam.vercel.app", preflightContinue: true })
);
router.post(
  "/add-books",
  cors({
    origin: "https://nabd-al-qalam.vercel.app",
    preflightContinue: true,
  }),
  books_add
);

module.exports = router;
