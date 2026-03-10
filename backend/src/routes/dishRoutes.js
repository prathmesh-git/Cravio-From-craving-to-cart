const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  addDish,
  getDishesByRestaurant,
  updateDish,
  toggleDishAvailability
} = require("../controllers/dishController");

const { getAllDishes } = require("../controllers/dishController");
const { searchDishes } = require("../controllers/dishController");

const { protect, authorizeSeller } = require("../middleware/authMiddleware");


// Public
router.get("/", getAllDishes);
router.get("/search", searchDishes);
router.get("/restaurant/:restaurantId", getDishesByRestaurant);

// Seller only
router.post(
  "/",
  protect,
  authorizeSeller,
  upload.array("images", 5),
  addDish
);
router.put("/:id", protect, authorizeSeller, updateDish);
router.patch("/:id/toggle", protect, authorizeSeller, toggleDishAvailability);

module.exports = router;