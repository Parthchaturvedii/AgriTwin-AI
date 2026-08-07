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

/* =====================================
   BUYER
===================================== */

/*
   Create purchase offer for a listing

   POST
   /api/offers/:id
*/
router.post(
  "/:id",
  protect,
  createOffer
);


/*
   Get offers created by current buyer

   GET
   /api/offers/buyer/my-offers
*/
router.get(
  "/buyer/my-offers",
  protect,
  getBuyerOffers
);


/* =====================================
   FARMER
===================================== */

/*
   Get offers received by current farmer

   GET
   /api/offers/farmer
*/
router.get(
  "/farmer",
  protect,
  getFarmerOffers
);


/*
   Accept offer

   PUT
   /api/offers/accept/:id
*/
router.put(
  "/accept/:id",
  protect,
  acceptOffer
);


/*
   Reject offer

   PUT
   /api/offers/reject/:id
*/
router.put(
  "/reject/:id",
  protect,
  rejectOffer
);


/*
   Hold offer

   PUT
   /api/offers/hold/:id
*/
router.put(
  "/hold/:id",
  protect,
  holdOffer
);


module.exports = router;