const {
  generateRecommendation,
} = require("../services/aiRecommendationService");

const getRecommendation = async (req, res) => {
  try {
    const farmData = req.body;

    const recommendation =
      await generateRecommendation(farmData);

    res.json({
      success: true,
      recommendation,
    });

  } catch (err) {

    console.error("Recommendation Error:", err.message);

    // Fallback recommendation
    const farmData = req.body;

    let fallback = `
🌱 Crop: ${farmData.crop}

• Irrigate every 3-4 days based on soil moisture.
• Monitor leaves regularly for pest or fungal infections.
• Apply balanced NPK fertilizer according to crop stage.
• Keep weeds under control.
• Continue monitoring weather before irrigation.
• Maintain proper drainage after rainfall.
`;

    if (
      farmData.temperature > 35 &&
      farmData.moisture < 40
    ) {
      fallback +=
        "\n⚠ High temperature detected. Increase irrigation frequency.";
    }

    if (
      farmData.weather?.toLowerCase() === "rainy"
    ) {
      fallback +=
        "\n🌧 Rain expected. Avoid irrigation today.";
    }

    res.json({
      success: true,
      recommendation: fallback,
    });
  }
};

module.exports = {
  getRecommendation,
};