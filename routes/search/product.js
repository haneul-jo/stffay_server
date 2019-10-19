const express = require("express");
const router = express.Router();
const axios = require("axios");
const parser = require("xml2json");
const mongoose = require("mongoose");
const Product = require("../../models/product");

router.get("/getItemList", (req, res) => {
  axios
    .get("https://domeggook.com/ssl/api/", { params: req.query })
    .then(response => {
      console.log(parser.toJson(response.data));
      res.json(parser.toJson(response.data));
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/addItem", (req, res) => {
  let addItem = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: req.body.productImage,
    productNo: req.body.productNo,
    productId: req.body.productId
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

router.delete("/removeItem/:id", (req, res) => {
  Product.remove({ _id: req.params.id }, err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
