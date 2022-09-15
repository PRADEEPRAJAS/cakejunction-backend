const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.route("/").post(productController.createProduct);

router.route("/").get(productController.getProduct);

router.route("/sorting").get(productController.sortedProducts);

module.exports = router;
