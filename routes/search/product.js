const express = require("express");
const router = express.Router();
const axios = require("axios");
const parser = require("xml2json");
const mongoose = require("mongoose");
const Product = require("../../models/product");
const domegguk = require("../../lib/authUtils");

// 도매꾹 상품 리스트 가져오기
router.get("/getItemList", (req, res) => {
  axios
    .get("https://domeggook.com/ssl/api/", { params: req.query })
    .then(response => {
      res.json(parser.toJson(response.data));
    })
    .catch(error => {
      console.log(error);
    });
});

//선택한 상품 상세정보 추가
router.post("/addItem", async (req, res) => {
  var productDetailInfo = {};
  var selectOption = {};
  const params = {
    ver: "4.2",
    mode: "getItemView",
    aid: domegguk.key,
    no: req.body.productNo
  };

  await axios
    .get("https://domeggook.com/ssl/api/", { params })
    .then(response => {
      productDetailInfo = JSON.parse(parser.toJson(response.data));
      selectOption = JSON.parse(productDetailInfo.domeggook.selectOpt);
    })
    .catch(error => {
      console.log(error);
    });

  const {
    basis,
    price,
    qty,
    thumb,
    deli,
    desc,
    seller,
    benefits,
    detail,
    category,
    return: takeBack,
    priceCompare,
    event
  } = productDetailInfo.domeggook;

  let addItem = new Product({
    basis: basis,
    price: price,
    qty: qty,
    deli: deli,
    images: thumb,
    desc: desc,
    selectOpt: selectOption,
    seller: seller,
    benefits: benefits,
    detail: detail,
    category: category,
    takeBack: takeBack,
    priceCompare: priceCompare,
    event: event
  });

  addItem.save(err => {
    if (err) throw err;
    return res.json({ succes: true });
  });
});

router.get("/getAddItemList", (req, res) => {
  Product.find().exec((err, ProductItems) => {
    if (err) throw err;
    res.json(ProductItems);
  });
});

// 선택한 상품 삭제하기
router.delete("/removeItem/:id", (req, res) => {
  Product.remove({ _id: req.params.id }, err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
