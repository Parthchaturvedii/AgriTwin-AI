const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const detectDisease = async (imagePath) => {
  try {
    const imageBytes = fs.readFileSync(imagePath);

    const extension = path.extname(imagePath).toLowerCase();

    let mimeType = "image/jpeg";

    switch (extension) {
      case ".png":
        mimeType = "image/png";
        break;
      case ".webp":
        mimeType = "image/webp";
        break;
      case ".jpg":
      case ".jpeg":
        mimeType = "image/jpeg";
        break;
      default:
        mimeType = "image/jpeg";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          inlineData: {
            mimeType,
            data: imageBytes.toString("base64"),
          },
        },
        {
          text: `
You are an expert agricultural plant pathologist.

Analyse this crop image.

Return ONLY in this format:

Disease:
Confidence:
Symptoms:
Treatment:
Prevention:

Keep the answer under 150 words.
`,
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Disease Detection Error:", error);
    throw error;
  }
};

module.exports = {
  detectDisease,
};