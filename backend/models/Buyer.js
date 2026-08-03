const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    buyerType: {
      type: String,
      enum: [
        "Wholesaler",
        "Retailer",
        "Exporter",
        "Food Industry",
        "Government",
        "Individual",
      ],
      default: "Retailer",
    },

    contactPerson: String,

    phone: String,

    state: String,

    district: String,

    address: String,

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buyer", buyerSchema);