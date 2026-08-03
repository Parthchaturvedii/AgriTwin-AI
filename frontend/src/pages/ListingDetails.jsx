import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [listing, setListing] = useState(null);

  const [offer, setOffer] = useState({
    offeredPrice: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    try {
      const { data } = await api.get(`/marketplace/${id}`);

      if (data.success) {
        setListing(data.listing);
      }
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Unable to load listing."
      );
    }
  };

  const handleChange = (e) => {
    setOffer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOffer = async () => {
    if (listing.status === "Sold") {
      return alert("This crop has already been sold.");
    }

    if (!offer.offeredPrice || !offer.quantity) {
      return alert(
        "Please enter offer price and quantity."
      );
    }

    if (
      Number(offer.offeredPrice) <= 0 ||
      Number(offer.quantity) <= 0
    ) {
      return alert(
        "Please enter valid price and quantity."
      );
    }

    try {
      const { data } = await api.post(
        `/offers/${id}`,
        offer
      );

      alert(
        data.message || "Offer Sent Successfully"
      );

      setOffer({
        offeredPrice: "",
        quantity: "",
        message: "",
      });

      loadListing();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to send offer."
      );
    }
  };

  if (!listing) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-white shadow px-8 py-5 flex items-center gap-4">

        <button
          onClick={() =>
            navigate(
              user?.role === "buyer"
                ? "/marketplace"
                : "/dashboard"
            )
          }
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Crop Details
        </h1>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Image */}

          <div>

            <img
              src={
                listing.image ||
                "https://placehold.co/700x500?text=Crop"
              }
              alt={listing.cropName}
              className="rounded-3xl shadow-lg w-full h-[500px] object-cover"
            />

          </div>

          {/* Details */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex justify-between items-center">

              <h1 className="text-4xl font-bold">
                {listing.cropName}
              </h1>

              {listing.status === "Sold" && (
                <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                  SOLD
                </span>
              )}

            </div>

            <p className="mt-6">
              <strong>Variety :</strong>{" "}
              {listing.variety}
            </p>

            <p className="mt-2">
              <strong>Quantity :</strong>{" "}
              {listing.quantity} {listing.unit}
            </p>

            <p className="mt-2">
              <strong>Expected Price :</strong>

              <span className="text-green-700 text-xl font-bold ml-2">
                ₹ {listing.expectedPrice}
              </span>

            </p>

            <p className="mt-2">
              <strong>Location :</strong>{" "}
              {listing.district},{" "}
              {listing.state}
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold">
              Description
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              {listing.description ||
                "No description available."}
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold">
              Farmer Information
            </h2>

            <p className="mt-4">
              <strong>Name :</strong>{" "}
              {listing.farmer?.fullName}
            </p>

            <p className="mt-2">
              <strong>Email :</strong>{" "}
              {listing.farmer?.email}
            </p>

            {/* Buyer Offer Section */}

            {user?.role === "buyer" &&
              listing.status !== "Sold" && (

                <>

                  <hr className="my-8" />

                  <h2 className="text-2xl font-bold">
                    Send Offer
                  </h2>

                  <input
                    type="number"
                    name="offeredPrice"
                    placeholder="Offer Price (₹)"
                    value={offer.offeredPrice}
                    onChange={handleChange}
                    className="border rounded-xl p-4 w-full mt-5"
                  />

                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={offer.quantity}
                    onChange={handleChange}
                    className="border rounded-xl p-4 w-full mt-4"
                  />

                  <textarea
                    rows="4"
                    name="message"
                    placeholder="Message to Farmer"
                    value={offer.message}
                    onChange={handleChange}
                    className="border rounded-xl p-4 w-full mt-4"
                  />

                  <button
                    onClick={sendOffer}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
                  >
                    Send Offer
                  </button>

                </>

              )}

            {/* Sold Message */}

            {user?.role === "buyer" &&
              listing.status === "Sold" && (

                <div className="mt-8 bg-red-100 border border-red-300 text-red-700 rounded-xl p-5 text-center font-semibold">
                  This crop has already been sold.
                </div>

              )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ListingDetails;