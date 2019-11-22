const express = require("express");
const router = express.Router();
const axios = require("axios");

//옥션 로그인 연동
router.get("/platformConnect", async (req, res) => {
  var xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <RequestApplicationTicket xmlns="http://www.auction.co.kr/ServiceInterfaces">
          <req DevID="hs88610" AppID="staffy" AppPassword="tmxpvltkdqhd" />
        </RequestApplicationTicket>
      </soap:Body>
    </soap:Envelope>`;

  var config = {
    headers: {
      "Content-Length": "length",
      "Content-Type": "text/xml; charset=utf-8"
    }
  };

  await axios
    .post(
      "https://api.auction.co.kr/APIv1/SecurityService.asmx",
      xmlBodyStr,
      config
    )
    .then(response => {
      console.log(" >>>>>>>>> result start >>>>>>>>>> ");
      console.log(response.data);
      console.log(" >>>>>>>>> result end >>>>>>>>>> ");
    })
    .catch(error => {
      console.log(" >>>>>> error start >>>>>");
      console.log(error.response.data);
      console.log(" >>>>>> error end >>>>>");
    });
});

module.exports = router;
