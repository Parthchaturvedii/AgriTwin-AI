const calculateDashboard = (farm) => {
  let healthScore = 100;
  const alerts = [];
  const recommendations = [];

  const ai = farm.aiData || {};

  // Soil Moisture
  if (ai.moisture !== undefined && ai.moisture < 40) {
    healthScore -= 15;
    recommendations.push("Irrigation is recommended today.");
  }

  // Soil pH
  if (
    ai.soilPH !== undefined &&
    (ai.soilPH < 6 || ai.soilPH > 8)
  ) {
    healthScore -= 10;
    alerts.push("Soil pH is outside the ideal range.");
  }

  // Nitrogen
  if (ai.nitrogen !== undefined && ai.nitrogen < 50) {
    healthScore -= 10;
    recommendations.push("Apply nitrogen-rich fertilizer.");
  }

  // Humidity
  if (ai.humidity !== undefined && ai.humidity > 80) {
    healthScore -= 5;
    alerts.push("High humidity may increase disease risk.");
  }

  // Yield Formula (v1)
  const estimatedYield = (farm.area * 3.8).toFixed(1);

  // Profit Formula (v1)
  const estimatedProfit = farm.area * 48000;

  return {
    farmHealth: Math.max(healthScore, 0),

    riskLevel:
      healthScore >= 80
        ? "Low"
        : healthScore >= 60
        ? "Medium"
        : "High",

    estimatedYield,

    estimatedProfit,

    alerts,

    recommendations,
  };
};

module.exports = {
  calculateDashboard,
};