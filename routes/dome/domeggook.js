const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getItemList", (req, res) => {
  axios
    .get(
      "https://domeggook.com/ssl/api/?ver=4.0&mode=getItemList&aid=de97efe43379339b34cc29cdc0d3c898&market=dome"
    )
    .then(res => {
      console.log(">>>>>>>> axios >>>> domeggook test >> ");
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    });

  res.send("<h1>request 도매꾹</h1>");
});

module.exports = router;
