const express = require("express");
const router = express.Router();
const cors = require("cors");
const { books_index, books_add } = require("../controllers/books.controller");

router.get("/", cors(), books_index);
router.post("/add-books", cors(), books_add);

module.exports = router;
