const express = require("express");

const router = express.Router();


const {
    getProfit
} = require("../controllers/profitController");



router.post(
    "/calculate",
    getProfit
);



module.exports = router;