const {
  generateMarketDecision,
} = require("../services/marketDecisionService");

const marketDecision = async (req, res) => {
  try {
    const result = await generateMarketDecision(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate AI market decision.",
    });
  }
};

module.exports = {
  marketDecision,
};