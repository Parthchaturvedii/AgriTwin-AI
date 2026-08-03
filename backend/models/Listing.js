const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Grains",
        "Vegetables",
        "Fruits",
        "Pulses",
        "Oil Seeds",
        "Spices",
        "Flowers",
      ],
      required: true,
    },

    variety: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      enum: [
        "Kg",
        "Quintal",
        "Ton",
        "Bag",
      ],
      default: "Kg",
    },

    expectedPrice: {
      type: Number,
      required: true,
    },

    marketPrice: {
      type: Number,
      default: 0,
    },

    aiRecommendedPrice: {
      type: Number,
      default: 0,
    },

    harvestDate: {
      type: Date,
    },

    qualityGrade: {
      type: String,
      enum: ["A", "B", "C"],
      default: "A",
    },

    organic: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "Available",
        "Reserved",
        "Sold",
        "Cancelled",
      ],
      default: "Available",
    },

    views: {
      type: Number,
      default: 0,
    },

    interestedBuyers: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);