const Offer = require("../models/Offer");

exports.getFarmerOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate("buyer", "fullName email")
      .populate("listing");

    const farmerOffers = offers.filter(
      (offer) =>
        offer.listing &&
        offer.listing.farmer.toString() === req.user._id.toString()
    );

    res.json({
      success: true,
      offers: farmerOffers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateOfferStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const offer = await Offer.findById(req.params.id)
      .populate("listing");

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    if (
      offer.listing.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    offer.status = status;

    await offer.save();

    res.json({
      success: true,
      offer,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};