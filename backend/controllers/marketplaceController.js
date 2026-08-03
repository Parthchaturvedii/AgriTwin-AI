const CropListing = require("../models/CropListing");

// Create Listing
exports.createListing = async (req, res) => {
  try {
    const listing = await CropListing.create({
      farmer: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Listings
exports.getListings = async (req, res) => {
  try {
    const listings = await CropListing.find()
      .populate("farmer", "fullName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      listings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get One Listing
exports.getListing = async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id)
      .populate("farmer", "fullName email");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      listing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await CropListing.findOneAndUpdate(
      {
        _id: req.params.id,
        farmer: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      listing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await CropListing.findOneAndDelete({
      _id: req.params.id,
      farmer: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      message: "Listing Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};