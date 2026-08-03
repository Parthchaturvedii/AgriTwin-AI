const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmName: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },

    areaUnit: {
      type: String,
      enum: ["acre", "hectare"],
      default: "acre",
    },

    location: {
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

      latitude: {
        type: Number,
      },

      longitude: {
        type: Number,
      },
    },

    soil: {
      type: String,
      enum: [
        "Alluvial",
        "Black",
        "Red",
        "Laterite",
        "Sandy",
        "Clay",
        "Loamy",
      ],
      default: "Loamy",
    },

    waterSource: {
      type: String,
      enum: [
        "Canal",
        "River",
        "Borewell",
        "Rainwater",
        "Pond",
      ],
      default: "Borewell",
    },

    irrigation: {
      type: String,
      enum: [
        "Drip",
        "Sprinkler",
        "Flood",
        "Manual",
      ],
      default: "Drip",
    },

    currentCrop: {
      type: String,
      trim: true,
      default: "",
    },

    cropStage: {
      type: String,
      enum: [
        "Seed",
        "Germination",
        "Vegetative",
        "Flowering",
        "Harvest",
      ],
      default: "Seed",
    },

    healthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "Healthy",
        "Needs Attention",
        "Critical",
      ],
      default: "Healthy",
    },

    aiData: {
      soilPH: {
        type: Number,
        default: 7,
      },

      nitrogen: {
        type: Number,
        default: 0,
      },

      phosphorus: {
        type: Number,
        default: 0,
      },

      potassium: {
        type: Number,
        default: 0,
      },

      moisture: {
        type: Number,
        default: 0,
      },

      rainfall: {
        type: Number,
        default: 0,
      },

      temperature: {
        type: Number,
        default: 0,
      },

      humidity: {
        type: Number,
        default: 0,
      },
    },

    sensors: {
      online: {
        type: Boolean,
        default: false,
      },

      lastUpdated: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Farm", farmSchema);