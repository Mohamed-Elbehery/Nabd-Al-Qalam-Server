const express = require("express");
const router = express.Router();

const {
  ecommerce_index,
  ecommerce_add,
} = require("../controllers/booksControllers");

router.get("/", ecommerce_index);
router.post("/add-books", ecommerce_add);

module.exports = router;
