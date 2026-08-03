const { generateChatResponse } = require("../services/chatbotService");
const Farm = require("../models/Farm");

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const farm = await Farm.findOne({
      owner: req.user._id,
    });

    const reply = await generateChatResponse(message, farm);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);

    return res.status(500).json({
      success: false,
      reply: "Unable to process your request.",
    });
  }
};

module.exports = {
  chat,
};