const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      enum: ["Kg", "Quintal", "Ton"],
      default: "Quintal",
    },

    price: {
      type: Number,
      required: true,
    },

    state: String,

    district: String,

    description: String,

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Marketplace", marketplaceSchema);