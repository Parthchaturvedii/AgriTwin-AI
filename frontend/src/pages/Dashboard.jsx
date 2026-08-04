import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Wheat,
  IndianRupee,
  TrendingUp,
  Bot,
  PlusCircle,
  Store,
  MessageCircle,
  Inbox,
  ShoppingBag,
} from "lucide-react";

import api from "../services/api";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatCard from "../components/dashboard/StatCard";
import AIDecisionCard from "../components/dashboard/AIDecisionCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import WeatherCard from "../components/dashboard/WeatherCard";
import YieldChart from "../components/dashboard/YieldChart";
import MiniDigitalTwin from "../components/dashboard/MiniDigitalTwin";
import FarmMap from "../components/dashboard/FarmMap";
import PricePrediction from "../components/PricePrediction";
import Chatbot from "../components/dashboard/Chatbot";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return JSON.parse(
      localStorage.getItem("sidebarOpen") ?? "true"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "sidebarOpen",
      JSON.stringify(sidebarOpen)
    );
  }, [sidebarOpen]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {

      try {

        const { data } = await api.get("/dashboard");

        if (data.success) {
          setDashboard(data);
        }

      } catch (err) {

        console.log(err);

        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard."
        );

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-slate-100">
        <h1 className="text-3xl font-bold animate-pulse text-green-600">
          Loading Farmer Dashboard...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen justify-center items-center bg-slate-100">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-red-600">
            Dashboard Error
          </h2>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >

        <div className="p-8">

          <Navbar />

          {/* Header */}

          <div className="mt-6 flex justify-between items-center flex-wrap gap-5">

            <div>

              <h1 className="text-4xl font-bold">

                Farmer Dashboard

              </h1>

              <p className="text-gray-500 mt-2">

                Smart AI Powered Farm Management

              </p>

            </div>

            <div className="flex gap-4 flex-wrap">

              <Link
                to="/create-listing"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <PlusCircle size={20} />
                Create Listing
              </Link>

              <Link
                to="/marketplace"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Store size={20} />
                Marketplace
              </Link>

              <Link
                to="/farmer-offers"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <ShoppingBag size={20} />
                Buyer Offers
              </Link>

              <Link
                to="/chat"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Inbox size={20} />
                Inbox
              </Link>

            </div>

          </div>

          {/* AI Decision */}

          <div className="mt-8">

            <AIDecisionCard />

          </div>

          {/* Overview */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <StatCard
              title="Current Crop"
              value={dashboard.currentCrop || "Wheat"}
              subtitle="Growing Crop"
              icon={<Wheat size={28} />}
              color="text-yellow-700"
              bgColor="bg-yellow-100"
            />

            <StatCard
              title="Today's Price"
              value="₹2450"
              subtitle="Current Market"
              icon={<IndianRupee size={28} />}
              color="text-green-700"
              bgColor="bg-green-100"
            />

            <StatCard
              title="Predicted Price"
              value="₹2780"
              subtitle="5 Day Forecast"
              icon={<TrendingUp size={28} />}
              color="text-blue-700"
              bgColor="bg-blue-100"
            />

            <StatCard
              title="AI Decision"
              value="HOLD"
              subtitle="94% Confidence"
              icon={<Bot size={28} />}
              color="text-purple-700"
              bgColor="bg-purple-100"
            />

          </div>

                    {/* ================= Recommendation + Weather ================= */}

          <div className="grid xl:grid-cols-2 gap-6 mt-8">

            <RecommendationCard />

            <WeatherCard />

          </div>

          {/* ================= Yield Forecast ================= */}

          <div className="mt-8">

            <YieldChart />

          </div>

          {/* ================= Price Prediction ================= */}

          <div className="mt-8">

            <PricePrediction />

          </div>

          {/* ================= Farmer Inbox ================= */}

          <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

            <div className="flex justify-between items-center flex-wrap gap-4">

              <div>

                <h2 className="text-3xl font-bold">

                  Buyer Inbox

                </h2>

                <p className="text-gray-500 mt-2">

                  Negotiate directly with buyers after they submit an offer.

                </p>

              </div>

              <Link
                to="/chat"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <MessageCircle size={20} />
                Open Inbox
              </Link>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div className="rounded-2xl bg-green-50 p-6">

                <h3 className="text-xl font-bold text-green-700">

                  Instant Negotiation

                </h3>

                <p className="mt-3 text-gray-600">

                  Chat with buyers in real-time to negotiate price,
                  quantity and delivery.

                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 p-6">

                <h3 className="text-xl font-bold text-blue-700">

                  Private Conversations

                </h3>

                <p className="mt-3 text-gray-600">

                  Every accepted offer gets its own secure conversation.

                </p>

              </div>

              <div className="rounded-2xl bg-purple-50 p-6">

                <h3 className="text-xl font-bold text-purple-700">

                  Faster Deals

                </h3>

                <p className="mt-3 text-gray-600">

                  Finalize payment, transport and crop pickup without
                  leaving AgriTwin AI.

                </p>

              </div>

            </div>

          </div>

          {/* ================= Buyer Offers ================= */}

          <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

            <div className="flex justify-between items-center flex-wrap gap-4">

              <div>

                <h2 className="text-3xl font-bold">

                  Recent Buyer Offers

                </h2>

                <p className="text-gray-500 mt-2">

                  Quickly review incoming offers.

                </p>

              </div>

              <Link
                to="/farmer-offers"
                className="text-orange-600 font-semibold"
              >
                View All →
              </Link>

            </div>

            <div className="mt-8 overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-4">

                      Buyer

                    </th>

                    <th className="text-left">

                      Crop

                    </th>

                    <th className="text-left">

                      Offered Price

                    </th>

                    <th className="text-left">

                      Quantity

                    </th>

                    <th className="text-left">

                      Status

                    </th>

                    <th className="text-left">

                      Action

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {(dashboard.offers || []).length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-12 text-center text-gray-500"
                      >

                        No buyer offers available.

                      </td>

                    </tr>

                  ) : (

                    dashboard.offers.slice(0, 5).map((offer) => (

                      <tr
                        key={offer._id}
                        className="border-b hover:bg-slate-50"
                      >

                        <td className="py-5">

                          {offer.buyer?.fullName}

                        </td>

                        <td>

                          {offer.listing?.cropName}

                        </td>

                        <td className="font-semibold text-green-700">

                          ₹{offer.offeredPrice}

                        </td>

                        <td>

                          {offer.quantity}

                        </td>

                        <td>

                          <span
                            className={`px-4 py-2 rounded-full text-white text-sm
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

                        </td>

                        <td>

                          <Link
                            to={`/chat/${offer._id}`}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition"
                          >
                            <MessageCircle size={16} />
                            Chat
                          </Link>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

                   {/* ================= AI Chatbot ================= */}

          <div className="mt-8">

            <Chatbot />

          </div>

          {/* ================= Digital Twin ================= */}

          <div className="mt-8">

            <MiniDigitalTwin />

          </div>

          {/* ================= Farm Map ================= */}

          <div className="mt-8">

            <FarmMap />

          </div>

          {/* ================= Quick Actions ================= */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">

              Quick Actions

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {/* Create Listing */}

              <Link
                to="/create-listing"
                className="rounded-3xl bg-green-600 hover:bg-green-700 text-white p-8 transition shadow-lg"
              >

                <PlusCircle size={42} />

                <h3 className="text-2xl font-bold mt-5">

                  Create Listing

                </h3>

                <p className="mt-3 opacity-90">

                  Sell your crops by creating a new marketplace listing.

                </p>

              </Link>

              {/* Marketplace */}

              <Link
                to="/marketplace"
                className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white p-8 transition shadow-lg"
              >

                <Store size={42} />

                <h3 className="text-2xl font-bold mt-5">

                  Marketplace

                </h3>

                <p className="mt-3 opacity-90">

                  View all active crop listings across the platform.

                </p>

              </Link>

              {/* Buyer Offers */}

              <Link
                to="/farmer-offers"
                className="rounded-3xl bg-orange-600 hover:bg-orange-700 text-white p-8 transition shadow-lg"
              >

                <ShoppingBag size={42} />

                <h3 className="text-2xl font-bold mt-5">

                  Buyer Offers

                </h3>

                <p className="mt-3 opacity-90">

                  Review, accept or reject offers from buyers.

                </p>

              </Link>

              {/* Inbox */}

              <Link
                to="/chat"
                className="rounded-3xl bg-purple-600 hover:bg-purple-700 text-white p-8 transition shadow-lg"
              >

                <MessageCircle size={42} />

                <h3 className="text-2xl font-bold mt-5">

                  Inbox

                </h3>

                <p className="mt-3 opacity-90">

                  Negotiate prices and finalize deals with buyers.

                </p>

              </Link>

              <Link
                to="/inbox"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                📩 Inbox
              </Link>

            </div>

          </div>

          {/* ================= Footer ================= */}

          <div className="mt-12 mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10 shadow-xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

              <div>

                <h2 className="text-3xl font-bold">

                  🌱 AgriTwin AI

                </h2>

                <p className="mt-3 text-green-100 max-w-2xl">

                  Your complete AI-powered farming companion.
                  Monitor crops, predict prices, negotiate with buyers,
                  and maximize profits through intelligent recommendations.

                </p>

              </div>

              <div className="text-center">

                <div className="text-5xl font-bold">

                  24/7

                </div>

                <div className="mt-2 text-green-100">

                  AI Assistance Available

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Dashboard;