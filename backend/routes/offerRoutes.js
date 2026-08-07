const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOffer,
  getBuyerOffers,
  getFarmerOffers,
  acceptOffer,
  rejectOffer,
  holdOffer,
} = require("../controllers/offerController");


/* Buyer creates offer */
router.post("/:id", protect, createOffer);


/* Buyer sees own offers */
router.get(
  "/buyer/my-offers",
  protect,
  getBuyerOffers
);


/* Farmer sees received offers */
router.get(
  "/farmer",
  protect,
  getFarmerOffers
);


/* Farmer accepts */
router.put(
  "/accept/:id",
  protect,
  acceptOffer
);


/* Farmer rejects */
router.put(
  "/reject/:id",
  protect,
  rejectOffer
);


/* Farmer holds */
router.put(
  "/hold/:id",
  protect,
  holdOffer
);


module.exports = router;