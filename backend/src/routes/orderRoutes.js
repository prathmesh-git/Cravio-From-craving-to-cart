const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getSellerOrders
} = require("../controllers/orderController");

const { protect, authorizeSeller } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);

router.get("/user", protect, getUserOrders);

router.get("/seller/:restaurantId", protect, authorizeSeller, getSellerOrders);

module.exports = router;