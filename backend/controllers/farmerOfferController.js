const Offer = require("../models/Offer");
const CropListing = require("../models/CropListing");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

/* =====================================================
   Get Offers Received by Logged-in Farmer
===================================================== */

exports.getFarmerOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      farmer: req.user._id,
    })
      .populate("buyer", "fullName email role")
      .populate("listing")
      .populate("chat")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error("Get Farmer Offers Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Unable to load offers.",
    });
  }
};

/* =====================================================
   Update Offer Status
   Pending = Hold
   Accepted = Accept
   Rejected = Reject
===================================================== */

exports.updateOfferStatus = async (req, res) => {
  try {
    const { status } = req.body;

    /* -----------------------------------------------
       Validate Status
    ------------------------------------------------ */

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer status.",
      });
    }

    /* -----------------------------------------------
       Find Offer
    ------------------------------------------------ */

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    /* -----------------------------------------------
       Security Check
       Only the farmer who owns the offer can modify it
    ------------------------------------------------ */

    if (
      offer.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this offer.",
      });
    }

    /* -----------------------------------------------
       Already Finalized
    ------------------------------------------------ */

    if (
      offer.status === "Accepted" ||
      offer.status === "Rejected"
    ) {
      return res.status(400).json({
        success: false,
        message: `This offer is already ${offer.status.toLowerCase()}.`,
      });
    }

    /* =================================================
       HOLD
       Pending means farmer keeps the offer on hold.
    ================================================= */

    if (status === "Pending") {
      offer.status = "Pending";

      await offer.save();

      return res.status(200).json({
        success: true,
        message: "Offer has been kept on hold.",
        offer,
      });
    }

    /* =================================================
       ACCEPT OFFER
    ================================================= */

    if (status === "Accepted") {
      offer.status = "Accepted";

      await offer.save();

      /* -----------------------------------------------
         Reject other offers for same listing
      ------------------------------------------------ */

      await Offer.updateMany(
        {
          listing: offer.listing,
          _id: { $ne: offer._id },
          status: "Pending",
        },
        {
          $set: {
            status: "Rejected",
          },
        }
      );

      /* -----------------------------------------------
         Mark listing as Sold
      ------------------------------------------------ */

      await CropListing.findByIdAndUpdate(
        offer.listing,
        {
          $set: {
            status: "Sold",
          },
        }
      );

      /* -----------------------------------------------
         Activate Chat
      ------------------------------------------------ */

      let chat = null;

      if (offer.chat) {
        chat = await Chat.findByIdAndUpdate(
          offer.chat,
          {
            $set: {
              status: "Active",
              lastMessage: "Offer accepted. You can now negotiate.",
              lastMessageAt: new Date(),
            },
          },
          { new: true }
        );
      }

      /* -----------------------------------------------
         If chat doesn't exist, create one
      ------------------------------------------------ */

      if (!chat) {
        chat = await Chat.create({
          participants: [
            offer.buyer,
            offer.farmer,
          ],

          buyer: offer.buyer,
          farmer: offer.farmer,

          listing: offer.listing,
          offer: offer._id,

          lastMessage:
            "Offer accepted. You can now negotiate.",

          lastMessageAt: new Date(),

          unreadCount: {
            farmer: 0,
            buyer: 1,
          },

          status: "Active",
        });

        offer.chat = chat._id;

        await offer.save();
      }

      /* -----------------------------------------------
         System Message
      ------------------------------------------------ */

      await Message.create({
        chat: chat._id,
        sender: offer.farmer,
        receiver: offer.buyer,
        message: "Your purchase offer has been accepted. You can now negotiate with the farmer.",
        type: "system",
      });

      return res.status(200).json({
        success: true,
        message:
          "Offer accepted. Buyer has been moved to your active inbox.",
        offer,
        chatId: chat._id,
      });
    }

    /* =================================================
       REJECT OFFER
    ================================================= */

    if (status === "Rejected") {
      offer.status = "Rejected";

      await offer.save();

      /* -----------------------------------------------
         Update Chat
      ------------------------------------------------ */

      if (offer.chat) {
        const chat = await Chat.findByIdAndUpdate(
          offer.chat,
          {
            $set: {
              lastMessage: "Offer rejected.",
              lastMessageAt: new Date(),
            },
          },
          { new: true }
        );

        /* ---------------------------------------------
           System Message
        --------------------------------------------- */

        if (chat) {
          await Message.create({
            chat: chat._id,
            sender: offer.farmer,
            receiver: offer.buyer,
            message: "Your purchase offer has been rejected.",
            type: "system",
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Offer rejected successfully.",
        offer,
      });
    }
  } catch (error) {
    console.error("Update Offer Status Error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Unable to update offer status.",
    });
  }
};