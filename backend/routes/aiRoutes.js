const express = require("express");

const router = express.Router();

const {
    marketDecision
} = require("../controllers/aiController");


router.post(
    "/market-decision",
    marketDecision
);


module.exports = router;