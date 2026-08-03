const getOfflineResponse = (message, farm) => {
  const query = message.toLowerCase();

  const crop = farm?.currentCrop || "Wheat";
  const moisture = farm?.aiData?.moisture ?? 65;
  const temperature = farm?.aiData?.temperature ?? 30;
  const humidity = farm?.aiData?.humidity ?? 60;

  // Greetings
  if (
    query.includes("hi") ||
    query.includes("hello") ||
    query.includes("hii") ||
    query.includes("namaste")
  ) {
    return `👋 Hello! I am AgriTwin AI.

Current Crop: ${crop}

You can ask me about:
• Irrigation
• Fertilizer
• Diseases
• Weather
• Market Price
• Yield
• Profit`;
  }

  // Irrigation
  if (
    query.includes("water") ||
    query.includes("irrigation") ||
    query.includes("pani")
  ) {
    if (moisture < 40) {
      return `💧 Soil moisture is only ${moisture}%.

I recommend irrigation today.

Prefer early morning or evening to reduce evaporation.`;
    }

    return `✅ Soil moisture is ${moisture}%.

No irrigation is needed today.

Check again after 2 days.`;
  }

  // Fertilizer
  if (
    query.includes("fertilizer") ||
    query.includes("fertiliser") ||
    query.includes("urea") ||
    query.includes("dap")
  ) {
    return `🌱 For ${crop}:

• Apply fertilizer according to the crop stage.
• Avoid applying before heavy rain.
• Use balanced nutrients based on soil health.`;
  }

  // Weather
  if (
    query.includes("weather") ||
    query.includes("rain") ||
    query.includes("temperature")
  ) {
    return `🌦 Current Conditions

Temperature : ${temperature}°C
Humidity : ${humidity}%
Soil Moisture : ${moisture}%

Weather is suitable for normal field operations.`;
  }

  // Disease
  if (
    query.includes("disease") ||
    query.includes("leaf") ||
    query.includes("rust") ||
    query.includes("pest")
  ) {
    return `🍃 Disease Prevention

• Inspect leaves every 2–3 days.
• Remove infected leaves immediately.
• Avoid overwatering.
• Spray fungicide only if symptoms appear.`;
  }

  // Price
  if (
    query.includes("price") ||
    query.includes("mandi") ||
    query.includes("sell")
  ) {
    return `📈 Market Advice

Current Price : ₹2450/Qtl

Predicted Price : ₹2780/Qtl

Recommendation:
Hold your crop for another 5 days for potentially better returns.`;
  }

  // Profit
  if (query.includes("profit")) {
    return `💰 Profit Analysis

Current Value:
₹355,250

Expected Value:
₹403,100

Expected Extra Profit:
₹47,850`;
  }

  return `🤖 I couldn't understand your exact question.

Try asking about:
• Weather
• Irrigation
• Fertilizer
• Diseases
• Mandi Price
• Profit
• Crop Management`;
};

module.exports = {
  getOfflineResponse,
};