const Farm = require("../models/Farm");

// Create Farm
const createFarm = async (req, res) => {
  try {
    const farm = await Farm.create({
      owner: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Farm created successfully.",
      farm,
    });
  } catch (error) {
    console.error("Create Farm Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Farms
const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: farms.length,
      farms,
    });
  } catch (error) {
    console.error("Get Farms Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Farm By ID
const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found.",
      });
    }

    res.json({
      success: true,
      farm,
    });
  } catch (error) {
    console.error("Get Farm Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Farm
const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found.",
      });
    }

    res.json({
      success: true,
      message: "Farm updated successfully.",
      farm,
    });
  } catch (error) {
    console.error("Update Farm Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Farm
const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found.",
      });
    }

    res.json({
      success: true,
      message: "Farm deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Farm Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFarm,
  getFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
};