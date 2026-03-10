const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish"
  },

  nameSnapshot: {
    type: String,
    required: true
  },

  priceSnapshot: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  imageSnapshot: {
    type: String
  }
});