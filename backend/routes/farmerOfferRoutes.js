const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getFarmerOffers,
  updateOfferStatus,
} = require("../controllers/farmerOfferController");

/* =====================================================
   Farmer Offer Center
===================================================== */

// Get all offers received by logged-in farmer
router.get(
  "/",
  protect,
  getFarmerOffers
);

// Accept / Reject / Hold offer
router.put(
  "/:id",
  protect,
  updateOfferStatus
);

module.exports = router;