const express = require("express");

const router = express.Router();

const {
  getDigitalTwin,
} = require("../controllers/digitalTwinController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getDigitalTwin);

module.exports = router;