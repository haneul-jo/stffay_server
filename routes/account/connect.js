const express = require("express");
const router = express.Router();
const axios = require("axios");
const iconv = require("iconv-lite");
const parser = require("xml2json");
const jschardet = require("jschardet");
var Iconv = require("iconv").Iconv;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { elevenSt } = require("../../lib/authUtils");

//옥션 로그인 연동
router.get("/platformConnect", async (req, res) => {
  console.log(">>>>>>>>>> auction login >>>>>>>>");

  var xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
        <EncryptedTicket xmlns="http://www.auction.co.kr/Security">
          <Value>d5+sdHJ4FHYeO8cwQhyT1Yo1qR5eMc1DSLDkc6USWkvd6bvvZE3vJ4eWB1QGLCSb8Oqv0lY2fyQl5aL461SGW1QZuURpvyXl/FeFuoAk7vB+foSXPGejlTAa6oOWM2Fnyj9lVgDpP6V1YJfrChEvXZV1bKrZUE2k/aBZD/ewOxwKS6BRh6rNwNZBjRVovn3gmZ0I0xXFYPcGSPzBdFu9RAk=</Value>
        </EncryptedTicket>
      </soap:Header>
      <soap:Body>
        <GetMyAccount xmlns="http://www.auction.co.kr/APIv1/AuctionService">
          <req>
            <MemberTicket xmlns="http://schema.auction.co.kr/Arche.APISvc.xsd">
              <Ticket>string</Ticket>
            </MemberTicket>
          </req>
        </GetMyAccount>
      </soap:Body>
      </soap:Envelope>`;

  var config = {
    // responseType: "arraybuffer",
    // responseEncoding: "binary",
    headers: {
      "Content-Length": "length",
      "Content-Type": "text/xml; charset=utf-8"
    }
  };

  await axios
    .get("https://api.auction.co.kr", xmlBodyStr, config)
    .then(response => {
      const result = iconv.decode(response, "utf-8");
      console.log(" >>>>>>>>> result 연동 완료 start >>>>>>>>>> ");
      console.log(result);
      console.log(" >>>>>>>>> result 연동 완료 end >>>>>>>>>> ");
    })
    .catch(error => {
      //   console.log(" >>> jschardet.detect(error.response.data)");
      //   console.log(jschardet.detect(error.response.data));

      //   console.log(" >>>>>> error.response >>>>>");
      //   console.log(error.response);

      console.log(" >>>>>> error.response.data >>>>>");
      console.log(error.response.data);

      const typeEncode = jschardet.detect(error.response.data);

      //   var kscToutf8 = new Iconv(typeEncode.encoding, "utf-8//TRANSLIT//IGNORE");
      var kscToutf8 = new Iconv(typeEncode.encoding, "utf-8//TRANSLIT//IGNORE");

      //   console.log(" >>>>>>> kscToutf8.convert(error.response.data) >>>>>>>>>>");
      //   console.log(kscToutf8.convert(error.response.data));

      console.log(" >>>>>>> kscToutf8 >>>>>>>");
      console.log(kscToutf8);

      const buffer = kscToutf8.convert(error.response.data);

      console.log(" >>>>>> buffer ascii >>>>>");
      console.log(buffer.toString());

      console.log(" >>> buffer.toString(utf-8) >>>> ");
      console.log(buffer.toString("utf-8"));

      //   var kscToutf8 = new Iconv("CP949", "utf-8");

      //   console.log(" >>>>> typeof error.response.data >>>>>");
      //   console.log(typeof error.response.data);

      //   const result = iconv.decode(error.response.data, "csksc56011987");
      //   const result2 = iconv.decode(error.response.data, "ksc56011987");
      //   const result3 = iconv.decode(error.response.data, "cp949");
      //   const result4 = iconv.decode(error.response.data, "ms949");
      //   const result5 = iconv.decode(error.response.data, "euckr");
      //   const result6 = iconv.decode(error.response.data, "ksc5601");
      //   const result7 = iconv.decode(error.response.data, "utf-8");

      //   console.log(result);
      //   console.log(result2);
      //   console.log(result3);
      //   console.log(result4);
      //   console.log(result5);
      //   console.log(result6);
      //   console.log(result7);

      //   console.log(iconv.encode(result7, "utf-8"));

      //   console.log(">>>>>>>> 연동 error start >>>>>>>>>");
      //   console.log(error.response.data);
      //   console.log(">>>>>>>> 연동 error end >>>>>>>>>");
    });
});

//옥션 로그인 연동
// router.get("/RequestApplicationTicket", async (req, res) => {
//   console.log(">>>>>>>>>> auction Request Application Ticket >>>>>>>>");

//   var xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
//     <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//       <soap:Body>
//         <RequestApplicationTicket xmlns="http://www.auction.co.kr/ServiceInterfaces">
//           <req DevID="staffy" AppID="88329phsqhdgk!" AppPassword="string" />
//         </RequestApplicationTicket>
//       </soap:Body>
//     </soap:Envelope>`;

//   var config = {
//     responseType: "arraybuffer",
//     responseEncoding: "binary",
//     headers: {
//       "Content-Length": "length",
//       "Content-Type": "text/xml; charset=utf-8"
//     }
//   };

//   await axios
//     .post("https://api.auction.co.kr", xmlBodyStr, config)
//     .then(response => {
//       const result = iconv.decode(response, "utf-8");
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = router;
