const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateRecommendation(farmData) {
  const prompt = `
You are an expert agricultural advisor.

Farm Data:
Crop: ${farmData.crop}
Temperature: ${farmData.temperature} °C
Humidity: ${farmData.humidity} %
Soil Moisture: ${farmData.moisture} %
Weather: ${farmData.weather}

Provide:
1. Irrigation advice
2. Disease risk
3. Fertilizer recommendation
4. Yield improvement tip

Keep the answer concise (under 150 words).
`;

  try {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
} catch (err) {
  console.error("Gemini SDK Error:");
  console.error(err);
  throw err;
}

  return response.text;
}

module.exports = {
  generateRecommendation,
};