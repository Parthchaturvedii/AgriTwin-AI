const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getFarmerOffers,
  updateOfferStatus,
} = require("../controllers/farmerOfferController");

router.get("/", protect, getFarmerOffers);

router.put("/:id", protect, updateOfferStatus);

module.exports = router;