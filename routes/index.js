const express = require("express");
var router = express.Router();

const account = require("./account/account");
const authentication = require("./authentication/authentication");
const main = require("./main/main");
const search = require("./search/product");
const register = require("./register/product");

router.get("/", (req, res) => {
  res.send(">>>> index >>>");
});
router.use("/authentication", authentication);
router.use("/account", account);
router.use("/search", search);
router.use("/register", register);
router.use("/main", main);

module.exports = router;
