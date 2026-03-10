const Order = require("../models/Order");
const Dish = require("../models/Dish");

exports.createOrder = async (req, res) => {
  try {
    const { items, restaurantId, deliveryLocation, source } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const dish = await Dish.findById(item.dishId);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      const price = dish.price * item.quantity;
      totalAmount += price;

      orderItems.push({
        dishId: dish._id,
        nameSnapshot: dish.name,
        priceSnapshot: dish.price,
        quantity: item.quantity,
        imageSnapshot: dish.images?.[0]?.url || null
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      restaurantId,
      items: orderItems,
      totalAmount,
      deliveryLocation,
      source
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      restaurantId: req.params.restaurantId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};