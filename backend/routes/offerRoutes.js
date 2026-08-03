const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOffer,
  getBuyerOffers,
  getFarmerOffers,
  acceptOffer,
  rejectOffer,
} = require("../controllers/offerController");

router.post("/:id", protect, createOffer);

router.get("/buyer/my-offers", protect, getBuyerOffers);

router.get("/farmer", protect, getFarmerOffers);

router.put("/accept/:id", protect, acceptOffer);

router.put("/reject/:id", protect, rejectOffer);

module.exports = router;