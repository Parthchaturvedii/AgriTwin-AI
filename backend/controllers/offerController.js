const Offer = require("../models/Offer");
const CropListing = require("../models/CropListing");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

/* =====================================================
   Buyer Creates Offer
===================================================== */

exports.createOffer = async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Buyer cannot send offer to own listing
    if (listing.farmer.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot make an offer on your own listing.",
      });
    }

    // Prevent duplicate offers
    const existingOffer = await Offer.findOne({
      listing: listing._id,
      buyer: req.user._id,
    });

    if (existingOffer) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted an offer for this listing.",
      });
    }

    // Create Offer
    const offer = await Offer.create({
      listing: listing._id,
      buyer: req.user._id,
      farmer: listing.farmer,
      offeredPrice: req.body.offeredPrice,
      quantity: req.body.quantity,
      message: req.body.message,
      status: "Pending",
    });

    // Create Chat Automatically
    // Find existing chat
let chat = await Chat.findOne({
  listing: listing._id,
  participants: {
    $all: [req.user._id, listing.farmer],
  },
});

// Create chat if it doesn't exist
if (!chat) {
  chat = await Chat.create({
    participants: [
      req.user._id,
      listing.farmer,
    ],

    listing: listing._id,

    lastMessage:
      req.body.message ||
      "Buyer submitted an offer.",

    lastMessageAt: new Date(),

    unreadCount: {
      farmer: 1,
      buyer: 0,
    },

    status: "Active",
  });
}

// Create first message
await Message.create({
  chat: chat._id,

  sender: req.user._id,

  receiver: listing.farmer,

  message:
    req.body.message ||
    `Offer submitted for ₹${req.body.offeredPrice}`,

  type: "offer",
});

// Update chat
chat.lastMessage =
  req.body.message ||
  `Offer submitted for ₹${req.body.offeredPrice}`;

chat.lastMessageAt = new Date();

chat.unreadCount.farmer += 1;

await chat.save();

// Link chat with offer
offer.chat = chat._id;
await offer.save();

    // Link chat to offer
    offer.chat = chat._id;
    await offer.save();

    res.status(201).json({
      success: true,
      message: "Offer submitted successfully.",
      offer,
      chatId: chat._id,
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
   Buyer -> My Offers
===================================================== */

exports.getBuyerOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      buyer: req.user._id,
    })
      .populate("listing")
      .populate("farmer", "fullName email")
      .populate("chat");

    res.status(200).json({
      success: true,
      offers,
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
   Farmer -> Received Offers
===================================================== */

exports.getFarmerOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      farmer: req.user._id,
    })
      .populate("buyer", "fullName email")
      .populate("listing")
      .populate("chat");

    res.status(200).json({
      success: true,
      offers,
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
   Accept Offer
===================================================== */

exports.acceptOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    if (offer.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    offer.status = "Accepted";
    await offer.save();

    // Reject remaining offers
    await Offer.updateMany(
      {
        listing: offer.listing,
        _id: { $ne: offer._id },
      },
      {
        status: "Rejected",
      }
    );

    // Mark crop sold
    await CropListing.findByIdAndUpdate(
      offer.listing,
      {
        status: "Sold",
      }
    );

    // Update Chat
    if (offer.chat) {
  await Chat.findByIdAndUpdate(
    offer.chat,
    {
      lastMessage: "Offer Accepted ✅",
      lastMessageAt: new Date(),
      status: "Archived",
    }
  );

  await Message.create({
    chat: offer.chat,
    sender: req.user._id,
    receiver: offer.buyer,
    message: "Your offer has been accepted.",
    type: "system",
  });
}

    res.status(200).json({
      success: true,
      message: "Offer Accepted Successfully",
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
   Reject Offer
===================================================== */

exports.rejectOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    if (offer.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    offer.status = "Rejected";
    await offer.save();

    // Update Chat
    if (offer.chat) {
  await Chat.findByIdAndUpdate(
    offer.chat,
    {
      lastMessage: "Offer Rejected",
      lastMessageAt: new Date(),
    }
  );

  await Message.create({
    chat: offer.chat,
    sender: req.user._id,
    receiver: offer.buyer,
    message: "Your offer has been rejected.",
    type: "system",
  });
}

    res.status(200).json({
      success: true,
      message: "Offer Rejected Successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};