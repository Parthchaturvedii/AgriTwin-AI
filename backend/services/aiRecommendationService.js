const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateRecommendation(farmData) {
  const prompt = `
You are an expert agriculture advisor.

Crop : ${farmData.crop}

Temperature : ${farmData.temperature}°C

Humidity : ${farmData.humidity}%

Soil Moisture : ${farmData.moisture}%

Weather : ${farmData.weather}

Give:

1. Irrigation Advice
2. Disease Risk
3. Fertilizer Recommendation
4. Yield Improvement Tip

Maximum 120 words.
`;

  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

    return response.text;

  } catch (error) {

    console.log(
      "Gemini unavailable, using fallback..."
    );

    throw error;
  }
}

module.exports = {
  generateRecommendation,
};