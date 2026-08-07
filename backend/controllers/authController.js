const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");

const generateToken = require("../utils/generateToken");

//
// Register
//
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      phone,
      state,
      district,
      village,
      companyName,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Validate role
    if (!["farmer", "buyer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    });

    try {
      // Create Farmer profile
      if (role === "farmer") {
        await Farmer.create({
          owner: user._id,
          phone,
          state,
          district,
          village,
        });
      }

      // Create Buyer profile
      if (role === "buyer") {
        await Buyer.create({
          owner: user._id,
          companyName,
          phone,
          state,
          district,
        });
      }
    } catch (profileError) {
      // Remove User if Farmer/Buyer creation fails
      await User.findByIdAndDelete(user._id);

      throw profileError;
    }

    // Generate JWT
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("=================================");
    console.error("REGISTER ERROR");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};
//
// Login
//
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

//
// Get Profile
//
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load profile.",
    });
  }
};

//
// Update Profile
//
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.fullName = req.body.fullName || user.fullName;
    user.profileImage = req.body.profileImage || user.profileImage;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Profile update failed.",
    });
  }
};

//
// Change Password
//
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both passwords.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};