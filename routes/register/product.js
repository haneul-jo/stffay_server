const express = require("express");
const router = express.Router();
const axios = require("axios");
const iconv = require("iconv-lite");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { elevenSt } = require("../../lib/authUtils");

const xmljs = require('xml-js');

const config11St = {
  responseType: "arraybuffer",
  responseEncoding: "binary",
  headers: {
    "Content-Type": "text/xml",
    openapikey: elevenSt.key
  }
};

//11번가 등록된 상품 전체 조회하기
router.get("/getMyProductList", async (req, res) => {

  // var xmlBodyStr = `<?xml version="1.0" encoding="euc-kr" standalone="yes"?>
  //   <SearchProduct>
  //       <limit>5</limit>
  //   </SearchProduct>`;

  let body = {
    "_declaration": {
      "_attributes": {
        "version": "1.0",
        "encoding": "euc-kr",
        "standalone": "yes"
      }
    },
    SearchProduct: {
      limit : 5
    }
  }
  body = xmljs.json2xml(body, {compact: true});

  // console.log(body);
  const param = iconv.encode(body, "euc-kr");

  await axios
    .post(
      "http://api.11st.co.kr/rest/prodmarketservice/prodmarket",
      param,
      config11St
    )
    .then(response => {
      // console.log(response)
      const data = iconv.decode(response.data, "euc-kr");

      let result = xmljs.xml2json(data, {ignoreDeclaration: true, compact: true});
      result = JSON.parse(result);

      // console.log(result["ns2:products"]["ns2:product"]);

      let product = result["ns2:products"]["ns2:product"];

      for(p of product){
        // TODO: 한글꺠짐
        console.log(p.prdNo._text, p.prdNm._text)
      }
    })
    .catch(error => {
      console.log(error);
    });
});

//선택한 상품 상세정보 추가
router.post("/registerProduct", async (req, res) => {
  const { productTitle, desc } = req.body;

  var xmlBodyStr = `<?xml version="1.0" encoding="euc-kr" standalone="yes"?>
    <Product>
    <selMthdCd>01</selMthdCd>
    <dispCtgrNo>1009024</dispCtgrNo>
    <prdTypCd>01</prdTypCd>
    <prdNm>${productTitle}</prdNm>
    <brand>자체상품</brand>
    <rmaterialTypCd>04</rmaterialTypCd>
    <orgnTypCd>02</orgnTypCd>
    <orgnTypDtlsCd>1287</orgnTypDtlsCd>
    <suplDtyfrPrdClfCd>01</suplDtyfrPrdClfCd>
    <prdStatCd>01</prdStatCd>
    <minorSelCnYn>Y</minorSelCnYn>
    <prdImage01>http://store.img11.co.kr/39339286/7c1217f1-d6e2-4034-851a-28913d433fbe_1572417410001.jpeg</prdImage01>
    <htmlDetail>  
        <![CDATA[
            ${desc}
        ]]>  
      </htmlDetail>
    <selPrdClfCd>3:101</selPrdClfCd>
    <aplBgnDy>2019/11/05</aplBgnDy>
    <aplEndDy>2019/11/07</aplEndDy>
    <selPrc>12000</selPrc>
    <prdSelQty>5</prdSelQty>
    <gblDlvYn>N</gblDlvYn>
    <dlvCnAreaCd>01</dlvCnAreaCd>
    <dlvWyCd>01</dlvWyCd>
    <dlvEtprsCd>00034</dlvEtprsCd>
    <dlvSendCloseTmpltNo>오늘발송</dlvSendCloseTmpltNo>
    <dlvCstInstBasiCd>02</dlvCstInstBasiCd>
    <dlvCst1>2500</dlvCst1>
    <dlvCstInfoCd>01</dlvCstInfoCd>
    <bndlDlvCnYn>N</bndlDlvCnYn>
    <dlvCstPayTypCd>03</dlvCstPayTypCd>
    <jejuDlvCst>2500</jejuDlvCst>
    <islandDlvCst>2500</islandDlvCst>
    <rtngdDlvCst>5000</rtngdDlvCst>
    <exchDlvCst>5000</exchDlvCst>
    <rtngdDlvCd>01</rtngdDlvCd>
    <asDetail>010-9150-9196</asDetail>
    <rtngExchDetail>010-9150-9196</rtngExchDetail>
    <dlvClf>02</dlvClf>
    <ProductNotification>
        <type>891015</type>
        <item>
            <code>23760386</code>
            <name>상품상세설명 참조</name>
        </item>
        <item>
            <code>11835</code>
            <name>노랑</name>
        </item>
        <item>
            <code>23759095</code>
            <name>베트남</name>
        </item>
        <item>
            <code>23760437</code>
            <name>010-9150-9196</name>
        </item>
        <item>
            <code>23756520</code>
            <name>손세탁</name>
        </item>
        <item>
            <code>23759468</code>
            <name>극세사</name>
        </item>
        <item>
            <code>11905</code>
            <name>상품상세설명 참조</name>
        </item>
        <item>
            <code>17461</code>
            <name>상품상세설명 참조</name>
        </item>
        <item>
            <code>23760034</code>
            <name>L/M/S</name>
        </item>
    </ProductNotification>
  </Product>`;

  var config = {
    responseType: "arraybuffer",
    responseEncoding: "binary",
    headers: {
      "Content-Type": "text/xml; charset=euc-kr",
      openapikey: elevenSt.key
    }
  };

  const param = iconv.encode(xmlBodyStr, "euc-kr");

  await axios
    .post("http://api.11st.co.kr/rest/prodservices/product", param, config)
    .then(response => {
      const result = iconv.decode(response.data, "euc-kr");
      console.log(">>>>>>>>>>>>>>>>>> 11번가 상품 리스트 데이터 >>>>>>>>>>>>>");
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
});

//선택한 상품 상세정보 수정
router.put("/modifyProduct", async (req, res) => {
  const { productTitle, desc } = req.body;

  var xmlBodyStr = `<?xml version="1.0" encoding="euc-kr" standalone="yes"?>
      <Product>
      <selMthdCd>01</selMthdCd>
      <dispCtgrNo>1009024</dispCtgrNo>
      <prdTypCd>01</prdTypCd>
      <prdNm>${productTitle}</prdNm>
      <brand>brand test 22</brand>
      <rmaterialTypCd>04</rmaterialTypCd>
      <orgnTypCd>02</orgnTypCd>
      <orgnTypDtlsCd>1287</orgnTypDtlsCd>
      <suplDtyfrPrdClfCd>01</suplDtyfrPrdClfCd>
      <prdStatCd>01</prdStatCd>
      <minorSelCnYn>Y</minorSelCnYn>
      <prdImage01>http://store.img11.co.kr/39339286/7c1217f1-d6e2-4034-851a-28913d433fbe_1572417410001.jpeg</prdImage01>
      <htmlDetail>  
        <![CDATA[
            ${desc}
        ]]>  
      </htmlDetail>
      <selPrdClfCd>3:101</selPrdClfCd>
      <aplBgnDy>2019/11/05</aplBgnDy>
      <aplEndDy>2019/11/07</aplEndDy>
      <selPrc>12000</selPrc>
      <prdSelQty>5</prdSelQty>
      <gblDlvYn>N</gblDlvYn>
      <dlvCnAreaCd>01</dlvCnAreaCd>
      <dlvWyCd>01</dlvWyCd>
      <dlvEtprsCd>00034</dlvEtprsCd>
      <dlvSendCloseTmpltNo>오늘발송</dlvSendCloseTmpltNo>
      <dlvCstInstBasiCd>02</dlvCstInstBasiCd>
      <dlvCst1>2500</dlvCst1>
      <dlvCstInfoCd>01</dlvCstInfoCd>
      <bndlDlvCnYn>N</bndlDlvCnYn>
      <dlvCstPayTypCd>03</dlvCstPayTypCd>
      <jejuDlvCst>2500</jejuDlvCst>
      <islandDlvCst>2500</islandDlvCst>
      <rtngdDlvCst>5000</rtngdDlvCst>
      <exchDlvCst>5000</exchDlvCst>
      <rtngdDlvCd>01</rtngdDlvCd>
      <asDetail>010-9150-9196</asDetail>
      <rtngExchDetail>010-9150-9196</rtngExchDetail>
      <dlvClf>02</dlvClf>
      <ProductNotification>
          <type>891015</type>
          <item>
              <code>23760386</code>
              <name>상품상세설명 참조</name>
          </item>
          <item>
              <code>11835</code>
              <name>노랑</name>
          </item>
          <item>
              <code>23759095</code>
              <name>베트남</name>
          </item>
          <item>
              <code>23760437</code>
              <name>010-9150-9196</name>
          </item>
          <item>
              <code>23756520</code>
              <name>손세탁</name>
          </item>
          <item>
              <code>23759468</code>
              <name>극세사</name>
          </item>
          <item>
              <code>11905</code>
              <name>상품상세설명 참조</name>
          </item>
          <item>
              <code>17461</code>
              <name>상품상세설명 참조</name>
          </item>
          <item>
              <code>23760034</code>
              <name>L/M/S</name>
          </item>
      </ProductNotification>
    </Product>`;

  var config = {
    responseType: "arraybuffer",
    responseEncoding: "binary",
    headers: {
      "Content-Type": "text/xml;charset=euc-kr",
      openapikey: elevenSt.key
    }
  };

  const param = iconv.encode(xmlBodyStr, "euc-kr");

  await axios
    .put(
      "http://api.11st.co.kr/rest/prodservices/product/2613067967",
      param,
      config
    )
    .then(response => {
      const result = iconv.decode(response.data, "euc-kr");
      console.log(" >>>>>>>>> result 수정 완료 start >>>>>>>>>> ");
      console.log(result);
      console.log(" >>>>>>>>> result 수정 완료 end >>>>>>>>>> ");
    })
    .catch(error => {
      console.log(">>>>>>>>>>> error >>>>>>>>>>>>>");
      console.log(error);
    });
});

module.exports = router;
