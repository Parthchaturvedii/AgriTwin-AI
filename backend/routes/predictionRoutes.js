const express = require("express");
const router = express.Router();

const { predictPrice } = require("../controllers/predictionController");

router.post("/price", predictPrice);

module.exports = router;