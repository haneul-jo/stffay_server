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

/*
 * 참고 url: http://openapi.domeggook.com/main/reference/detail?api_no=73&scope_code=SCP_OPEN
 */
const ProductItemShcema = new Schema({
  // basis : {
  // no: Number,
  // status: String,
  // title: String,
  // nego: String,
  // adult: Boolean,
  // dateStart: Date,
  // dateEnd: Date,
  // dateReg: Date,
  // tax: String,
  // }
  basis: Schema.Types.Mixed,
  price: Schema.Types.Mixed,
  qty: Schema.Types.Mixed,
  delivery: Schema.Types.Mixed,
  images: Schema.Types.Mixed,
  desc: Schema.Types.Mixed,
  selectOpt: String,
  seller: Schema.Types.Mixed,
  benefits: Schema.Types.Mixed,
  detail: Schema.Types.Mixed,
  category: Schema.Types.Mixed,
  return: Schema.Types.Mixed,
  priceCompare: Schema.Types.Mixed,
  event: Schema.Types.Mixed
});

module.exports = mongoose.model("ProductItem", ProductItemShcema);
