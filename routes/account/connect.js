const express = require("express");
const router = express.Router();
const axios = require("axios");
const iconv = require("iconv-lite");
const parser = require("xml2json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { elevenSt } = require("../../lib/authUtils");

//옥션 로그인 연동
router.post("/platformConnect", async (req, res) => {
  console.log(">>>>>>>>>> auction login >>>>>>>>");
  //   const { productTitle, desc } = req.body;

  var xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Header>
            <EncryptedTicket xmlns="http://www.auction.co.kr/Security">
                <Value>d7lY3c6Gd+uBTtqvw8XNaBuuTesllHTV4dV2iC+Mcld1YF4ZlOMoH/UNK5L7MyE4JUMj4kNow/UUvdjE72oO+bYoE02C65c5sYayXWdicTTFF3RXitGA2OyI1g1iBMjHYpGe3Pb1Q1akvMEqHv087JFZGrUkZOWkVlMeoLvEBOIbEL9DTsqs9K5D2EK2EJFLodMhWccmvEhguryjZim2sK4=</Value>
            </EncryptedTicket>
        </soap:Header>
        <soap:Body>
    <GetAuthenticate xmlns="http://www.auction.co.kr/APIv1/AuctionService">
          <req>
            <ID xmlns="http://schema.auction.co.kr/Arche.APISvc.xsd">hs88610</ID>
            <Password xmlns="http://schema.auction.co.kr/Arche.APISvc.xsd">88329phsqhdgk!</Password>
          </req>
        </GetAuthenticate>
        </soap:Body>
    </soap:Envelope>`;

  var config = {
    responseType: "arraybuffer",
    responseEncoding: "binary",
    headers: {
      "Content-Length": "length",
      "Content-Type": "text/xml; charset=utf-8"
    }
  };

  //   const param = iconv.encode(xmlBodyStr, "utf-8");

  await axios
    // .post("http://api.auction.co.kr", param, config)
    .post("http://api.auction.co.kr", xmlBodyStr, config)
    .then(response => {
      const result = iconv.decode(response, "utf-8");
      console.log(" >>>>>>>>> result 연동 완료 start >>>>>>>>>> ");
      console.log(response);
      console.log(" >>>>>>>>> result 연동 완료 end >>>>>>>>>> ");
    })
    .catch(error => {
      console.log(" >>>>>> error.data >>>>>>>>>>>> start");
      console.log(error);
      console.log(" >>>>>> error.data >>>>>>>>>>>> end");

      console.log(">>>>>>>> 연동 error start >>>>>>>>>");
      //   console.log(error);
      const result = iconv.decode(error.data, "utf-8");
      console.log(result);
      console.log(">>>>>>>> 연동 error end >>>>>>>>>");
    });
});

module.exports = router;
