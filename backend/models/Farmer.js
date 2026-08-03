const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    state: String,

    district: String,

    village: String,

    pincode: String,

    experience: {
      type: Number,
      default: 0,
    },

    preferredLanguage: {
      type: String,
      default: "English",
    },

    totalFarms: {
      type: Number,
      default: 0,
    },

    totalArea: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Farmer", farmerSchema);