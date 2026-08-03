import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function FarmerOffers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/offers/farmer");

      if (data.success) {
        setOffers(data.offers);
      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to load offers."
      );

    } finally {

      setLoading(false);

    }
  };

  const acceptOffer = async (id) => {
    try {

      const { data } = await api.put(
        `/offers/accept/${id}`
      );

      alert(data.message);

      fetchOffers();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Unable to accept offer."
      );

    }
  };

  const rejectOffer = async (id) => {
    try {

      const { data } = await api.put(
        `/offers/reject/${id}`
      );

      alert(data.message);

      fetchOffers();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Unable to reject offer."
      );

    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-white shadow px-8 py-5 flex items-center gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Farmer Offer Center
        </h1>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {loading ? (

          <div className="text-center text-2xl font-bold">
            Loading Offers...
          </div>

        ) : offers.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500 text-xl">
            No offers received yet.
          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {offers.map((offer) => (

              <div
                key={offer._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <h2 className="text-2xl font-bold">
                  {offer.listing?.cropName}
                </h2>

                <p className="mt-3">
                  <strong>Buyer:</strong>{" "}
                  {offer.buyer?.fullName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {offer.buyer?.email}
                </p>

                <p className="mt-3">
                  <strong>Quantity:</strong>{" "}
                  {offer.quantity}
                </p>

                <p>
                  <strong>Offer Price:</strong>{" "}
                  <span className="text-green-700 font-bold">
                    ₹ {offer.offeredPrice}
                  </span>
                </p>

                <p className="mt-4">
                  <strong>Message:</strong>
                </p>

                <p className="text-gray-600">
                  {offer.message || "No message"}
                </p>

                <div className="mt-5">

                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold
                    ${
                      offer.status === "Accepted"
                        ? "bg-green-600"
                        : offer.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {offer.status}
                  </span>

                </div>

                {offer.status === "Pending" && (

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        acceptOffer(offer._id)
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        rejectOffer(offer._id)
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default FarmerOffers;