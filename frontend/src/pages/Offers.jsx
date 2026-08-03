import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Package,
  IndianRupee,
} from "lucide-react";

import api from "../services/api";

function Offers() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const endpoint =
        user.role === "buyer"
          ? "/offers/buyer/my-offers"
          : "/offers/farmer";

      const { data } = await api.get(endpoint);

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

      <div className="bg-white shadow-md px-8 py-5 flex items-center gap-4">

        <button
          onClick={() =>
            navigate(
              user.role === "buyer"
                ? "/buyer-dashboard"
                : "/dashboard"
            )
          }
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">

          {user.role === "buyer"
            ? "My Offers"
            : "Received Offers"}

        </h1>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {loading ? (

          <div className="text-center text-2xl font-bold">
            Loading Offers...
          </div>

        ) : offers.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <Package
              size={60}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-bold mt-5">
              No Offers Found
            </h2>

            <p className="text-gray-500 mt-2">
              {user.role === "buyer"
                ? "You haven't sent any offers yet."
                : "No buyers have placed offers yet."}
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {offers.map((offer) => (

              <div
                key={offer._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <h2 className="text-2xl font-bold text-green-700">
                  {offer.listing?.cropName}
                </h2>

                <p className="mt-3 flex items-center gap-2">
                  <Package size={18} />
                  <strong>Quantity:</strong>
                  {offer.quantity}
                </p>

                <p className="mt-2 flex items-center gap-2">
                  <IndianRupee size={18} />
                  <strong>Offer Price:</strong>

                  <span className="font-bold text-green-700">
                    ₹ {offer.offeredPrice}
                  </span>

                </p>

                {user.role === "buyer" ? (
                  <>
                    <p className="mt-3 flex items-center gap-2">
                      <User size={18} />
                      <strong>Farmer:</strong>
                      {offer.farmer?.fullName}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 flex items-center gap-2">
                      <User size={18} />
                      <strong>Buyer:</strong>
                      {offer.buyer?.fullName}
                    </p>

                    <p className="mt-2 flex items-center gap-2">
                      <Mail size={18} />
                      <strong>Email:</strong>
                      {offer.buyer?.email}
                    </p>
                  </>
                )}

                <div className="mt-5">

                  <p className="font-semibold">
                    Message
                  </p>

                  <p className="text-gray-600">
                    {offer.message || "No message"}
                  </p>

                </div>

                <div className="mt-6">

                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold ${
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

                {user.role === "farmer" &&
                  offer.status === "Pending" && (

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

export default Offers;