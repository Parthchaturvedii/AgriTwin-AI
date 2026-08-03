const Farm = require("../models/Farm");

const getDigitalTwin = async (req, res) => {
  try {
    const farms = await Farm.find({
      owner: req.user._id,
    });

    return res.status(200).json({
      success: true,
      count: farms.length,
      farms,
    });
  } catch (error) {
    console.error("Digital Twin Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load Digital Twin.",
    });
  }
};

module.exports = {
  getDigitalTwin,
};