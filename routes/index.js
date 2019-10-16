const express = require("express");
const app = express();
var router = express.Router();
var path = require("path");

const main = require("./main/main");
const domeggook = require("./dome/domeggook");

router.get("/", (req, res) => {
  res.send(">>>> index >>>");
  //   res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/dome", domeggook);
router.use("/main", main);

module.exports = router;
