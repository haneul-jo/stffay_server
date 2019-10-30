const express = require("express");
var router = express.Router();

// var path = require("path");

const main = require("./main/main");
const search = require("./search/product");
const register = require("./register/product");

router.get("/", (req, res) => {
  res.send(">>>> index >>>");
  //   res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/register", register);
router.use("/search", search);
router.use("/main", main);

module.exports = router;
