const express = require("express");
const { getUserOrders, getOrder ,createOrder,getOrders,getFarmerOrders} = require("../controllers/ordersController");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthtoken");
const router = express.Router();

//user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/:id", createOrder);
//farmer routes
router.use(verifyIsLoggedIn);
router.get("/farmer/:id",getFarmerOrders)
//admin routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin",getOrders);
module.exports = router;
