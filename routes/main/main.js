const express = require("express");
var router = express.Router();
const Account = require("../../models/account");
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var path = require("path");

router.get("/", (req, res) => {
  res.send(">>>> main html >>>");
});

module.exports = router;
