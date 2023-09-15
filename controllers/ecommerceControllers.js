const Book = require("../models/ecommerce");
const { cloudinary } = require("../utils/cloudinary");

//! Controllers
const ecommerce_index = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.send("Error");
    });
};

const ecommerce_add = async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(req.body.img, {
      upload_preset: "nabdu_al_qalam",
    });

    const body = await { ...req.body, img: uploadedResponse?.url };
    console.log(uploadedResponse?.url);

    const newBook = await Book.create(body);
    newBook.save();
    res.status(201).json({ msg: "New Book Uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  ecommerce_index,
  ecommerce_add,
};
