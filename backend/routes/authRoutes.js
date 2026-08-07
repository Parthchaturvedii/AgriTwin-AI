const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

/* =====================================================
   AUTH ROUTES
===================================================== */

/*
POST /api/auth/register
Register Farmer or Buyer
*/
router.post("/register", register);


/*
POST /api/auth/login
Login
*/
router.post("/login", login);


/*
GET /api/auth/profile
Get logged-in user's profile
*/
router.get(
  "/profile",
  protect,
  getProfile
);


/*
PUT /api/auth/profile
Update logged-in user's profile
*/
router.put(
  "/profile",
  protect,
  updateProfile
);


/*
PUT /api/auth/change-password
Change password
*/
router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;