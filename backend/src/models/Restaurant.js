const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String
        },
        cuisineType: {
            type: String
        },
        imageUrl: {
            type: String
        },
        location: {
            addressLine: String,
            city: String,
            lat: Number,
            lng: Number
        },
        isTableBookingEnabled: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 0
        }
    }, {timestamps: true}
);


module.exports = mongoose.model("Restaurant", restaurantSchema);