const Offer = require("../models/Offer");
const CropListing = require("../models/CropListing");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

/* =====================================================
   BUYER CREATES OFFER
===================================================== */

exports.createOffer = async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Buyer cannot make an offer on own listing
    if (
      listing.farmer.toString() ===
      req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot make an offer on your own listing.",
      });
    }

    // Listing must be available
    if (listing.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "This crop listing is no longer available.",
      });
    }

    // Prevent duplicate offer
    const existingOffer = await Offer.findOne({
      listing: listing._id,
      buyer: req.user._id,
    });

    if (existingOffer) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an offer for this listing.",
      });
    }

    // Validate offer data
    if (!req.body.offeredPrice || !req.body.quantity) {
      return res.status(400).json({
        success: false,
        message: "Offered price and quantity are required.",
      });
    }

    /* =========================
       CREATE OFFER
    ========================= */

    const offer = await Offer.create({
      listing: listing._id,
      buyer: req.user._id,
      farmer: listing.farmer,
      offeredPrice: Number(req.body.offeredPrice),
      quantity: Number(req.body.quantity),
      message: req.body.message || "",
      status: "Pending",
    });

    /* =========================
       FIND / CREATE CHAT
    ========================= */

    let chat = await Chat.findOne({
      listing: listing._id,
      participants: {
        $all: [
          req.user._id,
          listing.farmer,
        ],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [
          req.user._id,
          listing.farmer,
        ],

        listing: listing._id,

        buyer: req.user._id,

        farmer: listing.farmer,

        offer: offer._id,

        lastMessage:
          req.body.message ||
          `Offer submitted for ₹${req.body.offeredPrice}`,

        lastMessageAt: new Date(),

        unreadCount: {
          farmer: 1,
          buyer: 0,
        },

        status: "Active",
      });
    } else {
      chat.offer = offer._id;

      chat.lastMessage =
        req.body.message ||
        `Offer submitted for ₹${req.body.offeredPrice}`;

      chat.lastMessageAt = new Date();

      chat.unreadCount =
        chat.unreadCount || {
          farmer: 0,
          buyer: 0,
        };

      chat.unreadCount.farmer =
        (chat.unreadCount.farmer || 0) + 1;

      chat.status = "Active";

      await chat.save();
    }

    /* =========================
       CREATE OFFER MESSAGE
    ========================= */

    await Message.create({
      chat: chat._id,
      sender: req.user._id,
      receiver: listing.farmer,

      message:
        req.body.message ||
        `Offer submitted for ₹${req.body.offeredPrice}`,

      type: "offer",
    });

    /* =========================
       LINK CHAT TO OFFER
    ========================= */

    offer.chat = chat._id;

    await offer.save();

    return res.status(201).json({
      success: true,
      message: "Offer submitted successfully.",
      offer,
      chatId: chat._id,
    });
  } catch (err) {
    console.error("CREATE OFFER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   BUYER → MY OFFERS
===================================================== */

exports.getBuyerOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      buyer: req.user._id,
    })
      .populate("listing")
      .populate("farmer", "fullName email")
      .populate("chat");

    return res.status(200).json({
      success: true,
      offers,
    });
  } catch (err) {
    console.error("GET BUYER OFFERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   FARMER → RECEIVED OFFERS
===================================================== */

exports.getFarmerOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      farmer: req.user._id,
    })
      .populate("buyer", "fullName email")
      .populate("listing")
      .populate("chat");

    return res.status(200).json({
      success: true,
      offers,
    });
  } catch (err) {
    console.error("GET FARMER OFFERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   ACCEPT OFFER
===================================================== */

exports.acceptOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    // Only farmer can accept
    if (
      offer.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // Only Pending or Hold offers can be accepted
    if (
      offer.status !== "Pending" &&
      offer.status !== "Hold"
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Offer is already ${offer.status}.`,
      });
    }

    /* =========================
       ACCEPT OFFER
    ========================= */

    offer.status = "Accepted";

    await offer.save();

    /* =========================
       REJECT OTHER OFFERS
    ========================= */

    await Offer.updateMany(
      {
        listing: offer.listing,
        _id: {
          $ne: offer._id,
        },
        status: {
          $in: ["Pending", "Hold"],
        },
      },
      {
        $set: {
          status: "Rejected",
        },
      }
    );

    /* =========================
       MARK LISTING SOLD
    ========================= */

    await CropListing.findByIdAndUpdate(
      offer.listing,
      {
        status: "Sold",
      }
    );

    /* =========================
       ACTIVATE CHAT
    ========================= */

    if (offer.chat) {
      await Chat.findByIdAndUpdate(
        offer.chat,
        {
          lastMessage:
            "Offer Accepted ✅ You can now negotiate.",
          lastMessageAt: new Date(),
          status: "Active",
        }
      );

      await Message.create({
        chat: offer.chat,
        sender: req.user._id,
        receiver: offer.buyer,

        message:
          "Your offer has been accepted. You can now negotiate.",

        type: "system",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Offer accepted successfully. Buyer can now chat with you.",
      offer,
      chatId: offer.chat || null,
    });
  } catch (err) {
    console.error("ACCEPT OFFER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   REJECT OFFER
===================================================== */

exports.rejectOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    // Only farmer can reject
    if (
      offer.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // Cannot reject already accepted/rejected
    if (
      offer.status === "Accepted" ||
      offer.status === "Rejected"
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Offer is already ${offer.status}.`,
      });
    }

    offer.status = "Rejected";

    await offer.save();

    /* =========================
       UPDATE CHAT
    ========================= */

    if (offer.chat) {
      await Chat.findByIdAndUpdate(
        offer.chat,
        {
          lastMessage: "Offer Rejected ❌",
          lastMessageAt: new Date(),
          status: "Active",
        }
      );

      await Message.create({
        chat: offer.chat,
        sender: req.user._id,
        receiver: offer.buyer,

        message:
          "Your offer has been rejected.",

        type: "system",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Offer rejected successfully.",
      offer,
    });
  } catch (err) {
    console.error("REJECT OFFER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   HOLD OFFER
===================================================== */

exports.holdOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    // Only farmer can hold
    if (
      offer.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // Only pending offers can be placed on hold
    if (offer.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          `Offer is already ${offer.status}.`,
      });
    }

    offer.status = "Hold";

    await offer.save();

    /* =========================
       UPDATE CHAT
    ========================= */

    if (offer.chat) {
      await Chat.findByIdAndUpdate(
        offer.chat,
        {
          lastMessage:
            "Offer placed on hold ⏸️",
          lastMessageAt: new Date(),
          status: "Active",
        }
      );

      await Message.create({
        chat: offer.chat,
        sender: req.user._id,
        receiver: offer.buyer,

        message:
          "Your offer has been placed on hold. The farmer will decide later.",

        type: "system",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Offer placed on hold.",
      offer,
    });
  } catch (err) {
    console.error("HOLD OFFER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};