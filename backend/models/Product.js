const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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

    productName: {
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
      enum: [
        "kg",
        "quintal",
        "ton",
        "bag",
      ],
      default: "kg",
    },

    pricePerUnit: {
      type: Number,
      required: true,
    },

    minimumOrder: {
      type: Number,
      default: 1,
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

    organic: {
      type: Boolean,
      default: false,
    },

    harvestedDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    available: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);