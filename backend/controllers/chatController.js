const Chat = require("../models/Chat");
const Message = require("../models/Message");

/* =====================================================
   GET MY INBOX
===================================================== */

exports.getInbox = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
      status: "Active",
    })
      .populate("participants", "fullName email role")
      .populate("listing")
      .populate("offer")
      .sort({ lastMessageAt: -1 });

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (err) {
    console.error("GET INBOX ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   GET SINGLE CHAT
===================================================== */

exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "fullName email role")
      .populate("listing")
      .populate("offer");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const allowed = chat.participants.some(
      (user) =>
        user._id.toString() === req.user._id.toString()
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant in this chat.",
      });
    }

    const messages = await Message.find({
      chat: chat._id,
    })
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      chat,
      messages,
    });
  } catch (err) {
    console.error("GET CHAT ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   SEND NORMAL MESSAGE
===================================================== */

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    /* Check participant */

    const userId = req.user._id.toString();

    const allowed = chat.participants.some(
      (id) => id.toString() === userId
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant in this chat.",
      });
    }

    /* Chat must be active */

    if (chat.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This chat is not active.",
      });
    }

    /* Find receiver */

    const receiver = chat.participants.find(
      (id) => id.toString() !== userId
    );

    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "Receiver not found.",
      });
    }

    /* Create message */

    const newMessage = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      receiver,
      message: message.trim(),
      type: "text",
    });

    /* Update chat */

    chat.lastMessage = message.trim();
    chat.lastMessageAt = new Date();

    /* Correct unread count */

    if (
      receiver.toString() ===
      chat.farmer.toString()
    ) {
      chat.unreadCount.farmer =
        (chat.unreadCount.farmer || 0) + 1;
    } else if (
      receiver.toString() ===
      chat.buyer.toString()
    ) {
      chat.unreadCount.buyer =
        (chat.unreadCount.buyer || 0) + 1;
    }

    await chat.save();

    /* Populate message before returning */

    const populatedMessage =
      await Message.findById(newMessage._id)
        .populate("sender", "fullName email role")
        .populate("receiver", "fullName email role");

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      newMessage: populatedMessage,
    });
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   COUNTER OFFER
===================================================== */

exports.counterOffer = async (req, res) => {
  try {
    const { offerPrice, message } = req.body;

    if (!offerPrice || Number(offerPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid counter offer price is required.",
      });
    }

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const userId = req.user._id.toString();

    const allowed = chat.participants.some(
      (id) => id.toString() === userId
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (chat.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This chat is not active.",
      });
    }

    const receiver = chat.participants.find(
      (id) => id.toString() !== userId
    );

    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "Receiver not found.",
      });
    }

    const counterMessage =
      message?.trim() ||
      `Counter Offer ₹${Number(
        offerPrice
      ).toLocaleString("en-IN")}`;

    const newMessage = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      receiver,
      message: counterMessage,
      type: "counterOffer",
      offerPrice: Number(offerPrice),
    });

    chat.lastMessage = counterMessage;
    chat.lastMessageAt = new Date();

    if (
      receiver.toString() ===
      chat.farmer.toString()
    ) {
      chat.unreadCount.farmer =
        (chat.unreadCount.farmer || 0) + 1;
    } else if (
      receiver.toString() ===
      chat.buyer.toString()
    ) {
      chat.unreadCount.buyer =
        (chat.unreadCount.buyer || 0) + 1;
    }

    await chat.save();

    const populatedMessage =
      await Message.findById(newMessage._id)
        .populate("sender", "fullName email role")
        .populate("receiver", "fullName email role");

    return res.status(201).json({
      success: true,
      message: "Counter offer sent successfully.",
      newMessage: populatedMessage,
    });
  } catch (err) {
    console.error("COUNTER OFFER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   MARK CHAT READ
===================================================== */

exports.markRead = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const userId = req.user._id.toString();

    const allowed = chat.participants.some(
      (id) => id.toString() === userId
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await Message.updateMany(
      {
        chat: chat._id,
        receiver: req.user._id,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      }
    );

    /* Reset correct user's unread count */

    if (
      chat.farmer.toString() === userId
    ) {
      chat.unreadCount.farmer = 0;
    }

    if (
      chat.buyer.toString() === userId
    ) {
      chat.unreadCount.buyer = 0;
    }

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Messages marked as read.",
    });
  } catch (err) {
    console.error("MARK READ ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};