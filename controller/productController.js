const { json } = require("stream/consumers");
const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    let productObj = req.body;
    const newProduct = await Product.create(productObj);
    res.status(201).json({
      status: "success",
      data: {
        produts: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err,
    });
  }
};
exports.sortedProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Product.find(queryObj);
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }
    const products = await query;
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch {
    res.status(404).json({
      status: "failure",
      message: "Product not found",
    });
  }
};
