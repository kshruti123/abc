const ObjectId = require("mongodb").ObjectId;
const Order = require("../models/OrderModel");
const Farmer = require("../models/FarmerModel");
const Product = require("../models/ProductModel");
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: new ObjectId(req.user._id) });
    res.send(orders);
  } catch (er) {
    next(er);
  }
};
const getOrder = async (req, res, next) => {
  try {
    const userId = req.params.id; // User ID passed as a parameter
    const orders = await Order.find({ user: userId })
    
      .populate("user", " -password -isAdmin -_id -__v -createdAt -updatedAt")
      .populate("farmer", "firstname lastname")
      .orFail();
    res.send(orders);
    
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { id } = req.params; // Farmer ID from the route parameter
    const { productID, productname, quantity, frequency } = req.body;

    // Check if the farmer exists
    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the order
    const order = new Order({
      user: new ObjectId(req.user._id),
      farmer: farmer._id,
      productID,
      productname,
      quantity,
      frequency,
    });

    // Save the order
    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    next(error);
  }
};
const getFarmerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ farmer: req.params.id })
      .populate("user", " -password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();
    return res.send(orders);
  } catch (er) {
    next(er);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "-password").sort({});
    res.send(orders);
  } catch (er) {
    next(er);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  getOrders,
  getFarmerOrders,
};
