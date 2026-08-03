const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const {
  analyzeDisease,
} = require("../controllers/diseaseController");

router.post(
  "/",
  upload.single("image"),
  analyzeDisease
);

module.exports = router;