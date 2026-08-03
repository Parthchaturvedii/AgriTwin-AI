const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createFarm,
  getFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
} = require("../controllers/farmController");

// Protect every route
router.use(protect);

// Create Farm
router.post("/", createFarm);

// Get All Farms
router.get("/", getFarms);

// Get Farm By ID
router.get("/:id", getFarmById);

// Update Farm
router.put("/:id", updateFarm);

// Delete Farm
router.delete("/:id", deleteFarm);

module.exports = router;