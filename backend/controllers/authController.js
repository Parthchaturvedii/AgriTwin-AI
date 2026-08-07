const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");

const generateToken = require("../utils/generateToken");

/* =====================================================
   REGISTER
===================================================== */

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

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    /* =====================================================
       ROLE VALIDATION
    ===================================================== */

    if (!["farmer", "buyer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Role must be farmer or buyer.",
      });
    }

    /* =====================================================
       FARMER VALIDATION
    ===================================================== */

    if (role === "farmer" && !phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required for farmer registration.",
      });
    }

    /* =====================================================
       BUYER VALIDATION
    ===================================================== */

    if (role === "buyer" && !companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required for buyer registration.",
      });
    }

    /* =====================================================
       CLEAN INPUT
    ===================================================== */

    const cleanEmail = email.toLowerCase().trim();
    const cleanFullName = fullName.trim();

    /* =====================================================
       CHECK EXISTING USER
    ===================================================== */

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    /* =====================================================
       HASH PASSWORD
    ===================================================== */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* =====================================================
       CREATE USER
    ===================================================== */

    const user = await User.create({
      fullName: cleanFullName,
      email: cleanEmail,
      password: hashedPassword,
      role,
    });

    console.log("✅ User created:", user._id);

    /* =====================================================
       CREATE FARMER / BUYER PROFILE
    ===================================================== */

    try {
      /* -------------------------------------------------
         FARMER
      ------------------------------------------------- */

      if (role === "farmer") {
        const farmer = await Farmer.create({
          // IMPORTANT:
          // Farmer schema requires "user", NOT "owner"
          user: user._id,

          phone: phone.trim(),
          state: state ? state.trim() : "",
          district: district ? district.trim() : "",
          village: village ? village.trim() : "",
        });

        console.log("🌾 Farmer profile created:", farmer._id);
      }

      /* -------------------------------------------------
         BUYER
      ------------------------------------------------- */

      if (role === "buyer") {
        const buyer = await Buyer.create({
          // IMPORTANT:
          // Buyer schema requires "user", NOT "owner"
          user: user._id,

          companyName: companyName.trim(),
          phone: phone ? phone.trim() : "",
          state: state ? state.trim() : "",
          district: district ? district.trim() : "",
        });

        console.log("🏢 Buyer profile created:", buyer._id);
      }
    } catch (profileError) {
      /*
       * If profile creation fails,
       * delete the User that was just created.
       */

      console.error("❌ Profile creation failed:");
      console.error(profileError);

      await User.findByIdAndDelete(user._id);

      throw profileError;
    }

    /* =====================================================
       GENERATE JWT
    ===================================================== */

    const token = generateToken(user._id);

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

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
    console.error("❌ REGISTER ERROR");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};


/* =====================================================
   LOGIN
===================================================== */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    /* =====================================================
       FIND USER
    ===================================================== */

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* =====================================================
       CHECK PASSWORD
    ===================================================== */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* =====================================================
       GENERATE TOKEN
    ===================================================== */

    const token = generateToken(user._id);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,
      message: "Login successful.",

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
    console.error("❌ Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};


/* =====================================================
   GET PROFILE
===================================================== */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load profile.",
    });
  }
};


/* =====================================================
   UPDATE PROFILE
===================================================== */

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (req.body.fullName) {
      user.fullName = req.body.fullName;
    }

    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("❌ Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Profile update failed.",
    });
  }
};


/* =====================================================
   CHANGE PASSWORD
===================================================== */

exports.changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both passwords.",
      });
    }

    /* =====================================================
       FIND USER
    ===================================================== */

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /* =====================================================
       CHECK CURRENT PASSWORD
    ===================================================== */

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    /* =====================================================
       HASH NEW PASSWORD
    ===================================================== */

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("❌ Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};