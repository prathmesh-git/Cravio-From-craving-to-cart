const Restaurant = require("../models/Restaurant");

// create restaurant (seller only)

exports.createRestaurant = async (req, res) => {
    try{
        const{
            name,
            description,
            cuisineType,
            imageUrl,
            location,
            isTableBookingEnabled
        } = req.body;

        const restaurant = await Restaurant.create({
            ownerId: req.user._id,
            name,
            description,
            cuisineType,
            imageUrl,
            location,
            isTableBookingEnabled
        });
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant
        });

    } catch (error) {
        res.status(500).json({message: "Server error "});

    }
};

// Get all restaurants (public)

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("ownerId", "name email");

    res.json(restaurants);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// GET SINGLE RESTAURANT
// -----------------------------
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("ownerId", "name email");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// UPDATE RESTAURANT (Owner only)
// -----------------------------
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check ownership
    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};