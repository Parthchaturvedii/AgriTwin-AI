const Farm = require("../models/Farm");

// REMOVE THIS
// const {
//   calculateDashboard,
// } = require("../services/dashboardService");

const getDashboard = async (req, res) => {
  try {
    res.json({
      success: true,

      stats: {
        health: 95,
        weather: 29,
        moisture: 68,
        yield: 18.5,
      },

      weatherData: {
        temperature: 29,
        humidity: 65,
        condition: "Sunny",
      },

      recommendations: [
        "Delay irrigation for 24 hours",
        "Low disease risk",
        "Apply NPK fertilizer next week",
      ],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};