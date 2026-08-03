const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
} = require("../controllers/marketplaceController");

router.get("/", getListings);

router.get("/:id", getListing);

router.post("/", protect, createListing);

router.put("/:id", protect, updateListing);

router.delete("/:id", protect, deleteListing);

module.exports = router;