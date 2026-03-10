const Dish = require("../models/Dish");
const Restaurant = require("../models/Restaurant");

exports.getDishesByRestaurant = async (req, res) => {
  try {
    const dishes = await Dish.find({
      restaurantId: req.params.restaurantId,
      isAvailable: true
    });

    res.json(dishes);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const uploadToCloudinary = require("../services/cloudinaryUpload");

exports.addDish = async (req, res) => {
  try {
    const { restaurantId, name, description, price, tags } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "dishes"
        );

        images.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id
        });
      }
    }

    const dish = await Dish.create({
      restaurantId,
      name,
      description,
      price,
      tags,
      images
    });

    res.status(201).json({
      message: "Dish added successfully",
      dish
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleDishAvailability = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const restaurant = await Restaurant.findById(dish.restaurantId);

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    dish.isAvailable = !dish.isAvailable;
    await dish.save();

    res.json({
      message: "Dish availability updated",
      dish
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDish = async (req, res) => {
  try {

    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const restaurant = await Restaurant.findById(dish.restaurantId);

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description, price, tags } = req.body;

    dish.name = name || dish.name;
    dish.description = description || dish.description;
    dish.price = price || dish.price;
    dish.tags = tags || dish.tags;

    await dish.save();

    res.json({
      message: "Dish updated successfully",
      dish
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllDishes = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const dishes = await Dish.find({ isAvailable: true })
      .populate("restaurantId", "name image location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Dish.countDocuments({ isAvailable: true });

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalDishes: total,
      dishes
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchDishes = async (req, res) => {
  try {

    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query required" });
    }

    const dishes = await Dish.find({
      isAvailable: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ]
    })
      .populate("restaurantId", "name image location")
      .limit(20);

    res.json(dishes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};