const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 8가지 schema type
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// Objectid
// Array

const ProductItemShcema = new Schema({
  productName: String,
  productPrice: Number,
  productImage: String,
  productNo: Number,
  productId: String
});

module.exports = mongoose.model("ProductItem", ProductItemShcema);
