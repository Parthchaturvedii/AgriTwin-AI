const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      unique: true,
      sparse: true,
      default: null,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CropListing",
      default: null,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },

    unreadCount: {
      farmer: {
        type: Number,
        default: 0,
      },

      buyer: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ["Active", "Archived", "Blocked"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);