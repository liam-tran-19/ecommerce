const mongoose = require("mongoose");
const shortid = require("shortid");

const Product = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  gender: String,
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String],
});

module.exports = mongoose.model("products", Product);
