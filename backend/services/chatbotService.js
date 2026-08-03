const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const offlineReply = (message, farm) => {
  const text = message.toLowerCase();

  const crop = farm?.currentCrop || "Wheat";
  const stage = farm?.cropStage || "Vegetative";
  const soil = farm?.soil || "Loamy";
  const moisture = farm?.aiData?.moisture ?? 65;
  const temperature = farm?.aiData?.temperature ?? 30;
  const humidity = farm?.aiData?.humidity ?? 60;

  // Greeting
  if (
    text.includes("hi") ||
    text.includes("hello") ||
    text.includes("hii") ||
    text.includes("hey") ||
    text.includes("namaste")
  ) {
    return `👋 Hello! Welcome to AgriTwin AI.

Current Farm Details

🌾 Crop: ${crop}
🌱 Stage: ${stage}
🌍 Soil: ${soil}

You can ask me about:

• Irrigation
• Fertilizer
• Weather
• Diseases
• Market Price
• Profit
• Crop Management`;
  }

  // Hindi Greeting
  if (
    text.includes("नमस्ते") ||
    text.includes("हेलो")
  ) {
    return `🙏 नमस्ते!

मैं AgriTwin AI हूँ।

आप पूछ सकते हैं:

• सिंचाई
• उर्वरक
• मौसम
• रोग
• मंडी भाव
• फसल प्रबंधन`;
  }

  // Irrigation
  if (
    text.includes("water") ||
    text.includes("irrigation") ||
    text.includes("pani") ||
    text.includes("सिंचाई") ||
    text.includes("पानी")
  ) {
    if (moisture < 40) {
      return `💧 Soil Moisture: ${moisture}%

Recommendation:
✅ Irrigate today.

Best Time:
Morning or evening to minimise evaporation.`;
    }

    return `💧 Soil Moisture: ${moisture}%

Recommendation:
✅ No irrigation required today.

Check soil moisture again after 2 days.`;
  }

  // Fertilizer
  if (
    text.includes("fertilizer") ||
    text.includes("fertiliser") ||
    text.includes("urea") ||
    text.includes("dap") ||
    text.includes("fertilizer") ||
    text.includes("खाद") ||
    text.includes("उर्वरक")
  ) {
    return `🌱 Fertilizer Advice

Crop: ${crop}

• Apply fertilizer according to crop stage.
• Avoid application before rainfall.
• Prefer balanced NPK fertiliser.
• Use organic manure whenever possible.`;
  }

  // Weather
  if (
    text.includes("weather") ||
    text.includes("temperature") ||
    text.includes("rain") ||
    text.includes("humidity") ||
    text.includes("मौसम")
  ) {
    return `🌦 Current Farm Weather

🌡 Temperature : ${temperature}°C
💧 Humidity : ${humidity}%
🌱 Soil Moisture : ${moisture}%

Recommendation:
Weather conditions appear suitable for normal farming activities.`;
  }

  // Disease
  if (
    text.includes("disease") ||
    text.includes("pest") ||
    text.includes("rust") ||
    text.includes("leaf") ||
    text.includes("रोग") ||
    text.includes("कीट")
  ) {
    return `🍃 Disease Prevention

• Inspect leaves every 2–3 days.
• Remove infected plants immediately.
• Avoid excess irrigation.
• Spray fungicide only when symptoms are visible.`;
  }

  // Wheat
  if (
    text.includes("wheat") ||
    text.includes("गेहूं")
  ) {
    return `🌾 Wheat Advisory

Current Crop: ${crop}

• Maintain proper irrigation schedule.
• Monitor rust disease.
• Apply nitrogen in split doses.
• Avoid waterlogging.
• Harvest after full grain maturity.`;
  }

  // Market Price
  if (
    text.includes("price") ||
    text.includes("mandi") ||
    text.includes("market") ||
    text.includes("sell") ||
    text.includes("भाव")
  ) {
    return `📈 Market Advisory

Current Price:
₹2450 / Quintal

Predicted Price:
₹2780 / Quintal

Recommendation:
🌟 Hold your crop for another 5 days to maximise profit.`;
  }

  // Profit
  if (
    text.includes("profit") ||
    text.includes("income")
  ) {
    return `💰 Profit Estimation

Sell Today:
₹355,250

Sell After Prediction:
₹403,100

Expected Extra Profit:
₹47,850`;
  }

  // Farm
  if (
    text.includes("farm") ||
    text.includes("field")
  ) {
    return `🚜 Farm Summary

Crop: ${crop}
Stage: ${stage}
Soil: ${soil}
Moisture: ${moisture}%

Farm health appears stable.
Continue regular monitoring.`;
  }

  // Default
  return `🤖 AgriTwin AI is running in Offline Mode.

I can help you with:

🌾 Crop Management
💧 Irrigation
🌦 Weather
🍃 Disease Detection
🧪 Fertilizer
📈 Market Prices
💰 Profit Estimation

Please ask a farming-related question.`;
};

const generateChatResponse = async (message, farm) => {
  try {
    const farmContext = farm
      ? `
Crop: ${farm.currentCrop}
Stage: ${farm.cropStage}
Soil: ${farm.soil}
Moisture: ${farm.aiData?.moisture || "Unknown"}
Temperature: ${farm.aiData?.temperature || "Unknown"}
Humidity: ${farm.aiData?.humidity || "Unknown"}
`
      : "No farm data available.";

    const prompt = `
You are AgriTwin AI.

${farmContext}

Farmer Question:
${message}

Instructions:
- Reply in the user's language.
- Keep the response under 150 words.
- Give practical farming advice.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("Gemini unavailable. Using offline mode.");
    return offlineReply(message, farm);
  }
};

module.exports = {
  generateChatResponse,
};