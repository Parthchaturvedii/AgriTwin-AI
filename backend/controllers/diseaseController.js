const {
  detectDisease,
} = require("../services/diseaseService");

const analyzeDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a crop image.",
      });
    }

    const result = await detectDisease(req.file.path);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Disease Detection Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Disease detection failed.",
    });
  }
};

module.exports = {
  analyzeDisease,
};