const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      profileImage,
    } = req.body;

    const user = req.user;

    if (fullName) user.fullName = fullName;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};