const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String,
  salt: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("account", AccountSchema);
