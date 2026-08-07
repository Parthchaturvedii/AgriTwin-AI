const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    /* =====================================================
       USER REFERENCE
    ===================================================== */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    /* =====================================================
       FARMER INFORMATION
    ===================================================== */

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },

    village: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    /* =====================================================
       FARM INFORMATION
    ===================================================== */

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

module.exports = mongoose.model(
  "Farmer",
  farmerSchema
);