import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  IndianRupee,
  TrendingUp,
  Store,
  Eye,
  MessageCircle,
  Inbox,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";

import Navbar from "../components/dashboard/Navbar";
import StatCard from "../components/dashboard/StatCard";

function BuyerDashboard() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [listings, setListings] = useState([]);
  const [offers, setOffers] = useState([]);

  const [loadingListings, setLoadingListings] =
    useState(true);

  const [loadingOffers, setLoadingOffers] =
    useState(true);

  useEffect(() => {
    fetchListings();
    fetchOffers();
  }, []);

  const fetchListings = async () => {
    try {
      const { data } = await api.get("/marketplace");

      if (data.success) {
        setListings(data.listings || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingListings(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const { data } = await api.get(
        "/offers/buyer/my-offers"
      );

      if (data.success) {
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingOffers(false);
    }
  };

  const acceptedOffers = offers.filter(
    (o) => o.status === "Accepted"
  ).length;

  const pendingOffers = offers.filter(
    (o) => o.status === "Pending"
  ).length;

  const rejectedOffers = offers.filter(
    (o) => o.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-8">

        {/* Header */}

        <div className="flex justify-between items-center flex-wrap gap-5">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">

              Buyer Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

              Welcome back,
              <span className="font-semibold ml-2">
                {user.fullName}
              </span>

            </p>

          </div>

          <div className="flex gap-4 flex-wrap">

            <Link
              to="/marketplace"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Marketplace
            </Link>

            <Link
              to="/offers"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              My Offers
            </Link>

            <Link
              to="/chat"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
            >
              <MessageCircle size={20} />
              Inbox
            </Link>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <StatCard
            title="Marketplace Listings"
            value={listings.length}
            subtitle="Available Crops"
            icon={<Store size={28} />}
            color="text-green-700"
            bgColor="bg-green-100"
          />

          <StatCard
            title="My Offers"
            value={offers.length}
            subtitle="Offers Sent"
            icon={<ShoppingCart size={28} />}
            color="text-blue-700"
            bgColor="bg-blue-100"
          />

          <StatCard
            title="Accepted"
            value={acceptedOffers}
            subtitle="Successful Deals"
            icon={<CheckCircle size={28} />}
            color="text-emerald-700"
            bgColor="bg-emerald-100"
          />

          <StatCard
            title="Market Average"
            value="₹2450"
            subtitle="Current Price"
            icon={<IndianRupee size={28} />}
            color="text-yellow-700"
            bgColor="bg-yellow-100"
          />

        </div>

        {/* Offer Overview */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-yellow-100 rounded-2xl p-6">

            <Clock
              className="text-yellow-600 mb-3"
              size={35}
            />

            <h2 className="text-3xl font-bold">
              {pendingOffers}
            </h2>

            <p className="text-gray-600">
              Pending Offers
            </p>

          </div>

          <div className="bg-green-100 rounded-2xl p-6">

            <CheckCircle
              className="text-green-600 mb-3"
              size={35}
            />

            <h2 className="text-3xl font-bold">
              {acceptedOffers}
            </h2>

            <p className="text-gray-600">
              Accepted Offers
            </p>

          </div>

          <div className="bg-red-100 rounded-2xl p-6">

            <XCircle
              className="text-red-600 mb-3"
              size={35}
            />

            <h2 className="text-3xl font-bold">
              {rejectedOffers}
            </h2>

            <p className="text-gray-600">
              Rejected Offers
            </p>

          </div>

        </div>

        {/* Marketplace */}

        <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-bold">

              Latest Crop Listings

            </h2>

            <Link
              to="/marketplace"
              className="text-green-600 font-semibold flex items-center gap-2"
            >
              View All
              <ArrowRight size={18} />
            </Link>

          </div>

          {loadingListings ? (

            <div className="py-16 text-center text-xl font-semibold">

              Loading Marketplace...

            </div>

          ) : listings.length === 0 ? (

            <div className="py-16 text-center text-gray-500">

              No Listings Available

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

              {listings.slice(0, 6).map((item) => (

                <div
                  key={item._id}
                  className="rounded-2xl border bg-white hover:shadow-xl transition p-6"
                >

                  <h2 className="text-2xl font-bold">

                    {item.cropName}

                  </h2>

                  <p className="text-gray-500">

                    {item.variety || "Premium Quality"}

                  </p>

                  <div className="mt-5 space-y-2">

                    <p className="flex items-center gap-2">

                      <Package size={18} />

                      {item.quantity} {item.unit}

                    </p>

                    <p className="font-bold text-green-700 text-xl">

                      ₹ {item.expectedPrice}

                    </p>

                    <p className="text-gray-500">

                      📍 {item.district}, {item.state}

                    </p>

                  </div>

                  <Link
                    to={`/listing/${item._id}`}
                    className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                  >
                    <Eye size={18} />
                    View Details
                  </Link>

                </div>

              ))}

            </div>

          )}

        </div>

                {/* ================= Recent Offers ================= */}

        <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-bold">
              My Recent Offers
            </h2>

            <Link
              to="/offers"
              className="text-blue-600 font-semibold flex items-center gap-2"
            >
              View All
              <ArrowRight size={18} />
            </Link>

          </div>

          {loadingOffers ? (

            <div className="py-12 text-center text-lg">
              Loading Offers...
            </div>

          ) : offers.length === 0 ? (

            <div className="py-12 text-center text-gray-500">
              You haven't submitted any offers yet.
            </div>

          ) : (

            <div className="space-y-5 mt-8">

              {offers.slice(0, 5).map((offer) => (

                <div
                  key={offer._id}
                  className="border rounded-2xl p-6 flex flex-col lg:flex-row justify-between lg:items-center gap-5 hover:shadow-md transition"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {offer.listing?.cropName}
                    </h3>

                    <p className="mt-2">
                      Offered Price :
                      <b className="ml-2 text-green-700">
                        ₹ {offer.offeredPrice}
                      </b>
                    </p>

                    <p>
                      Quantity :
                      <b className="ml-2">
                        {offer.quantity}
                      </b>
                    </p>

                    <p className="text-gray-500 mt-2">
                      Farmer :
                      <span className="ml-2">
                        {offer.farmer?.fullName}
                      </span>
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-3">

                    <span
                      className={`px-5 py-2 rounded-full text-white font-semibold
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

                    <Link
                      to={`/chat/${offer._id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
                    >
                      <MessageCircle size={18} />
                      Negotiate
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ================= Inbox ================= */}

        <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                Buyer Inbox
              </h2>

              <p className="text-gray-500 mt-2">
                Chat with farmers and negotiate offers in real-time.
              </p>

            </div>

            <Inbox
              size={40}
              className="text-purple-600"
            />

          </div>

          <div className="mt-8 bg-slate-100 rounded-2xl p-10 text-center">

            <MessageCircle
              className="mx-auto text-purple-600"
              size={70}
            />

            <h3 className="text-2xl font-bold mt-5">
              Start Negotiation
            </h3>

            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Every offer automatically creates a private conversation
              between the buyer and the farmer. Use the inbox to negotiate
              price, quantity, delivery, payment, and finalize the deal.
            </p>

            <Link
              to="/chat"
              className="inline-flex items-center gap-2 mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              <MessageCircle size={20} />
              Open Inbox
            </Link>

          </div>

        </div>

        {/* ================= Quick Actions ================= */}

        <div className="grid lg:grid-cols-3 gap-6 mt-10 mb-12">

          <Link
            to="/marketplace"
            className="bg-green-600 hover:bg-green-700 text-white rounded-3xl p-8 transition"
          >

            <Store size={45} />

            <h2 className="text-2xl font-bold mt-5">
              Marketplace
            </h2>

            <p className="mt-3 opacity-90">
              Browse all available crop listings across India.
            </p>

          </Link>

          <Link
            to="/offers"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 transition"
          >

            <ShoppingCart size={45} />

            <h2 className="text-2xl font-bold mt-5">
              My Offers
            </h2>

            <p className="mt-3 opacity-90">
              Track every offer you've sent to farmers.
            </p>

          </Link>

          <Link
            to="/chat"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-3xl p-8 transition"
          >

            <MessageCircle size={45} />

            <h2 className="text-2xl font-bold mt-5">
              Inbox & Negotiation
            </h2>

            <p className="mt-3 opacity-90">
              Negotiate prices, quantities and close deals with farmers.
            </p>

          </Link>

          <Link
  to="/inbox"
  className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow hover:bg-indigo-700"
>
   📩 Inbox
</Link>

        </div>

      </div>

    </div>
  );
}

export default BuyerDashboard;