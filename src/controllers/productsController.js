const Product = require('../models/productModel');

exports.getAll = async (req, res, next) => {
  try {
    const result = await Product.find().exec();
    res.status(200).json(result);
  } catch (err) {
    next(err, req, res);
  }
};

exports.get = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findById(productId).exec();
    if (!result)
      return res.status(404).json({
        status: 404,
        message: `Product with id ${productId} not found`
      });
    res.status(200).json(result);
  } catch (err) {
    next(err, res, req);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err, req, res);
  }
};

exports.update = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const changes = { ...req.body, modified: Date.now() };
    const result = await Product.findOneAndUpdate({ _id: productId }, changes, {
      new: true
    });
    if (!result)
      return res.status(404).json({
        status: 404,
        message: `Product with id ${productId} not found`
      });
    res.status(200).json(result);
  } catch (err) {
    next(err, req, res);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId).exec();
    if (!result)
      return res.status(404).json({
        status: 404,
        message: `Product with id ${productId} not found`
      });
    res.status(200).json(result);
  } catch (err) {
    next(err, req, res);
  }
};
