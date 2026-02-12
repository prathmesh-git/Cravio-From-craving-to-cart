const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    label: { type: String }, // Home, work
    addressLine: { type: String },
    city: { type: String },
    lat: { type: Number },
    lng: { type: Number },
}, { _id: true});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "SELLER"],
        default: "USER"
    },
    phone: {
        type: String
    },
    addresses: [addressSchema]
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);