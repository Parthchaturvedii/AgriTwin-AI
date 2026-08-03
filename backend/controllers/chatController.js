const Chat = require("../models/Chat");
const Message = require("../models/Message");

/* =====================================================
   Get My Inbox
===================================================== */

exports.getInbox = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
      status: "Active",
    })
      .populate("participants", "fullName email role")
      .populate("listing")
      .sort({ lastMessageAt: -1 });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   Get Single Chat
===================================================== */

exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "fullName email role")
      .populate("listing");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const allowed = chat.participants.some(
      (user) => user._id.toString() === req.user._id.toString()
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const messages = await Message.find({
      chat: chat._id,
    })
      .populate("sender", "fullName")
      .populate("receiver", "fullName")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      chat,
      messages,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   Send Message
===================================================== */

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const receiver = chat.participants.find(
      (id) => id.toString() !== req.user._id.toString()
    );

    const newMessage = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      receiver,
      message,
    });

    chat.lastMessage = message;
    chat.lastMessageAt = new Date();

    if (receiver.toString() === chat.participants[0].toString()) {
      chat.unreadCount.farmer += 1;
    } else {
      chat.unreadCount.buyer += 1;
    }

    await chat.save();

    res.status(201).json({
      success: true,
      message: "Message sent.",
      newMessage,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   Counter Offer
===================================================== */

exports.counterOffer = async (req, res) => {
  try {
    const { offerPrice, message } = req.body;

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const allowed = chat.participants.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const receiver = chat.participants.find(
      (id) => id.toString() !== req.user._id.toString()
    );

    const newMessage = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      receiver,
      message: message || `Counter Offer ₹${offerPrice}`,
      offerPrice,
      messageType: "counterOffer",
    });

    chat.lastMessage = message || `Counter Offer ₹${offerPrice}`;
    chat.lastMessageAt = new Date();

    if (chat.farmer && receiver.toString() === chat.farmer.toString()) {
      chat.unreadCount.farmer++;
    } else {
      chat.unreadCount.buyer++;
    }

    await chat.save();

    res.status(201).json({
      success: true,
      message: "Counter offer sent successfully.",
      newMessage,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   Mark Chat Read
===================================================== */

exports.markRead = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    await Message.updateMany(
      {
        chat: chat._id,
        receiver: req.user._id,
        seen: false,
      },
      {
        seen: true,
      }
    );

    if (req.user.role === "farmer") {
      chat.unreadCount.farmer = 0;
    } else {
      chat.unreadCount.buyer = 0;
    }

    await chat.save();

    res.status(200).json({
      success: true,
      message: "Messages marked as read.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};exports.sendMessage = async (req,res)=>{

    try{

        const { message } = req.body;

        const chat = await Chat.findById(req.params.chatId);

        if(!chat){

            return res.status(404).json({
                success:false,
                message:"Chat not found"
            });

        }

        const allowed = chat.participants.some(
            id=>id.toString()===req.user._id.toString()
        );

        if(!allowed){

            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });

        }

        const receiver = chat.participants.find(
            id=>id.toString()!==req.user._id.toString()
        );

        const newMessage = await Message.create({

            chat:chat._id,

            sender:req.user._id,

            receiver,

            message,

        });

        chat.lastMessage = message;

        chat.lastMessageAt = new Date();

        if(receiver.toString()===chat.farmer.toString()){

            chat.unreadCount.farmer++;

        }else{

            chat.unreadCount.buyer++;

        }

        await chat.save();

        res.status(201).json({

            success:true,

            newMessage,

        });

    }
    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}