const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant
} = require("../controllers/restaurantController");

const { protect, authorizeSeller } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

// Seller routes
router.post(
  "/",
  protect,
  authorizeSeller,
  upload.single("image"),
  createRestaurant
);
router.put("/:id", protect, authorizeSeller, updateRestaurant);

module.exports = router;