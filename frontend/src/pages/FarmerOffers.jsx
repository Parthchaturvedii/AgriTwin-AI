import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function FarmerOffers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  /* =====================================================
     FETCH OFFERS
  ===================================================== */

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/offers/farmer");

      if (data.success) {
        setOffers(data.offers || []);
      }
    } catch (error) {
      console.error("Fetch Offers Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load offers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  /* =====================================================
     ACCEPT OFFER
  ===================================================== */

  const acceptOffer = async (id) => {
    try {
      setUpdatingId(id);

      const { data } = await api.put(
        `/offers/accept/${id}`
      );

      alert(data.message || "Offer accepted successfully.");

      await fetchOffers();
    } catch (error) {
      console.error("Accept Offer Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to accept offer."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================================================
     HOLD OFFER
  ===================================================== */

  const holdOffer = async (id) => {
    try {
      setUpdatingId(id);

      const { data } = await api.put(
        `/offers/hold/${id}`
      );

      alert(data.message || "Offer placed on hold.");

      await fetchOffers();
    } catch (error) {
      console.error("Hold Offer Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to place offer on hold."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================================================
     REJECT OFFER
  ===================================================== */

  const rejectOffer = async (id) => {
    try {
      setUpdatingId(id);

      const { data } = await api.put(
        `/offers/reject/${id}`
      );

      alert(data.message || "Offer rejected successfully.");

      await fetchOffers();
    } catch (error) {
      console.error("Reject Offer Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to reject offer."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================================================
     STATUS STYLE
  ===================================================== */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-300";

      case "Rejected":
        return "bg-red-100 text-red-700 border-red-300";

      case "Hold":
        return "bg-orange-100 text-orange-700 border-orange-300";

      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  /* =====================================================
     STATUS LABEL
  ===================================================== */

  const getStatusLabel = (status) => {
    switch (status) {
      case "Accepted":
        return "Accepted";

      case "Rejected":
        return "Rejected";

      case "Hold":
        return "On Hold";

      case "Pending":
      default:
        return "Pending";
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw
            className="animate-spin mx-auto mb-4 text-green-600"
            size={40}
          />

          <h1 className="text-2xl font-bold">
            Loading Offers...
          </h1>
        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white shadow px-6 md:px-8 py-5 flex items-center gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Farmer Offer Center
          </h1>

          <p className="text-gray-500 text-sm">
            Manage purchase offers from buyers
          </p>
        </div>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="max-w-7xl mx-auto p-6 md:p-8">

        {/* HEADER ACTIONS */}

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Received Offers
            </h2>

            <p className="text-gray-500">
              {offers.length} offer
              {offers.length !== 1 ? "s" : ""} received
            </p>
          </div>

          <button
            onClick={fetchOffers}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>

        {/* =================================================
            NO OFFERS
        ================================================= */}

        {offers.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📩
            </div>

            <h2 className="text-2xl font-bold">
              No Offers Yet
            </h2>

            <p className="text-gray-500 mt-2">
              When buyers submit purchase offers
              on your crops, they will appear here.
            </p>

          </div>

        ) : (

          /* =================================================
             OFFERS GRID
          ================================================= */

          <div className="grid lg:grid-cols-2 gap-6">

            {offers.map((offer) => {

              const isUpdating =
                updatingId === offer._id;

              return (
                <div
                  key={offer._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >

                  {/* -----------------------------------------
                      CARD HEADER
                  ----------------------------------------- */}

                  <div className="p-6 border-b">

                    <div className="flex justify-between items-start gap-4">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {offer.listing?.cropName ||
                            "Crop Listing"}
                        </h2>

                        {offer.listing?.variety && (
                          <p className="text-gray-500">
                            {offer.listing.variety}
                          </p>
                        )}

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full border text-sm font-semibold ${getStatusStyle(
                          offer.status
                        )}`}
                      >
                        {getStatusLabel(
                          offer.status
                        )}
                      </span>

                    </div>

                  </div>

                  {/* -----------------------------------------
                      OFFER DETAILS
                  ----------------------------------------- */}

                  <div className="p-6 space-y-3">

                    <div className="flex justify-between gap-4">

                      <span className="text-gray-500">
                        Buyer
                      </span>

                      <span className="font-semibold text-right">
                        {offer.buyer?.fullName ||
                          "Unknown Buyer"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span className="text-gray-500">
                        Email
                      </span>

                      <span className="font-medium text-sm text-right">
                        {offer.buyer?.email ||
                          "Not available"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="font-semibold">
                        {offer.quantity}{" "}
                        {offer.listing?.unit || ""}
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span className="text-gray-500">
                        Offered Price
                      </span>

                      <span className="text-green-700 font-bold text-xl">
                        ₹
                        {Number(
                          offer.offeredPrice || 0
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                    {offer.listing?.expectedPrice && (
                      <div className="flex justify-between gap-4">

                        <span className="text-gray-500">
                          Expected Price
                        </span>

                        <span className="font-semibold">
                          ₹
                          {Number(
                            offer.listing.expectedPrice
                          ).toLocaleString("en-IN")}
                        </span>

                      </div>
                    )}

                    {/* MESSAGE */}

                    <div className="pt-3">

                      <p className="text-gray-500 text-sm mb-1">
                        Buyer Message
                      </p>

                      <div className="bg-slate-50 rounded-xl p-4">

                        {offer.message ? (
                          <p className="text-gray-700">
                            "{offer.message}"
                          </p>
                        ) : (
                          <p className="text-gray-400 italic">
                            No message provided.
                          </p>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      PENDING ACTIONS
                  ================================================= */}

                  {offer.status === "Pending" && (

                    <div className="px-6 pb-6">

                      <div className="grid grid-cols-3 gap-3">

                        {/* ACCEPT */}

                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            acceptOffer(
                              offer._id
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                        >
                          <Check size={18} />
                          Accept
                        </button>

                        {/* HOLD */}

                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            holdOffer(
                              offer._id
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                        >
                          <Clock size={18} />
                          Hold
                        </button>

                        {/* REJECT */}

                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            rejectOffer(
                              offer._id
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                        >
                          <X size={18} />
                          Reject
                        </button>

                      </div>

                    </div>

                  )}

                  {/* =================================================
                      HOLD ACTIONS
                  ================================================= */}

                  {offer.status === "Hold" && (

                    <div className="px-6 pb-6">

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 text-orange-800">
                        <p className="font-semibold">
                          ⏸️ Offer is currently on hold.
                        </p>

                        <p className="text-sm mt-1">
                          You can accept or reject this
                          offer later.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        {/* ACCEPT FROM HOLD */}

                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            acceptOffer(
                              offer._id
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                        >
                          <Check size={18} />
                          Accept
                        </button>

                        {/* REJECT FROM HOLD */}

                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            rejectOffer(
                              offer._id
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                        >
                          <X size={18} />
                          Reject
                        </button>

                      </div>

                    </div>

                  )}

                  {/* =================================================
                      ACCEPTED → OPEN CHAT
                  ================================================= */}

                  {offer.status === "Accepted" && (

                    <div className="px-6 pb-6">

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">

                        <p className="font-semibold text-green-700">
                          ✅ Offer Accepted
                        </p>

                        <p className="text-sm text-green-600 mt-1">
                          You can now negotiate with the
                          buyer.
                        </p>

                      </div>

                      <button
                        onClick={() => {

                          if (offer.chat?._id) {

                            navigate(
                              `/chat/${offer.chat._id}`
                            );

                          } else {

                            navigate("/inbox");

                          }

                        }}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        <MessageCircle size={18} />
                        Open Negotiation Chat
                      </button>

                    </div>

                  )}

                  {/* =================================================
                      REJECTED
                  ================================================= */}

                  {offer.status === "Rejected" && (

                    <div className="px-6 pb-6">

                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">

                        <p className="font-semibold text-red-700">
                          ❌ Offer Rejected
                        </p>

                        <p className="text-sm text-red-600 mt-1">
                          This purchase offer is no
                          longer active.
                        </p>

                      </div>

                    </div>

                  )}

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default FarmerOffers;