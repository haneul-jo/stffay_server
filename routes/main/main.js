const express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", (req, res) => {
  res.send(">>>> main html >>>");
  //   res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;
