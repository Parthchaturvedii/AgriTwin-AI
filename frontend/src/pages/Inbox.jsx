import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";

function Inbox() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  =====================================================
  GET CURRENT USER
  =====================================================
  */

  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);
    } catch (error) {
      console.error(
        "❌ Unable to read stored user:",
        error
      );

      return null;
    }
  };

  const user = getStoredUser();

  /*
  =====================================================
  FETCH CHATS
  =====================================================
  */

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("📥 Loading inbox...");

      const { data } = await api.get("/chats");

      console.log("📥 Inbox response:", data);

      if (data?.success) {
        setChats(data.chats || []);
      } else {
        setChats([]);

        setError(
          data?.message ||
            "Unable to load conversations."
        );
      }
    } catch (error) {
      console.error(
        "❌ Inbox Error:",
        error
      );

      /*
      IMPORTANT:

      Do NOT redirect to /login here.

      api.js no longer destroys the session
      automatically on a 401.
      */

      if (error.response?.status === 401) {
        setError(
          "Your session could not be verified. Please refresh the page or login again."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Unable to load inbox. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  INITIAL LOAD
  =====================================================
  */

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchChats();
  }, []);

  /*
  =====================================================
  NO USER
  =====================================================
  */

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <MessageCircle
            size={60}
            className="mx-auto text-purple-600 mb-5"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            Login Required
          </h2>

          <p className="mt-3 text-gray-500">
            Please login to access your conversations.
          </p>

          <button
            onClick={() =>
              navigate("/login", {
                replace: true,
              })
            }
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">
            💬
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Loading Inbox...
          </h2>

          <p className="text-gray-500 mt-2">
            Fetching your conversations
          </p>
        </div>
      </div>
    );
  }

  /*
  =====================================================
  MAIN UI
  =====================================================
  */

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigate(
                    user.role === "buyer"
                      ? "/buyer-dashboard"
                      : "/dashboard"
                  )
                }
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl transition"
              >
                <ArrowLeft size={18} />

                Back
              </button>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  💬 Inbox
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Your buyer and farmer conversations
                </p>
              </div>
            </div>

            {/* REFRESH */}

            <button
              onClick={fetchChats}
              disabled={loading}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
            >
              <RefreshCw size={17} />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={22}
                className="text-red-600 mt-0.5"
              />

              <div>
                <h3 className="font-bold text-red-700">
                  Unable to load Inbox
                </h3>

                <p className="text-red-600 mt-1">
                  {error}
                </p>

                <button
                  onClick={fetchChats}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!error && chats.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <MessageCircle
              size={65}
              className="mx-auto text-gray-400 mb-5"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              No Conversations Yet
            </h2>

            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Your conversations will appear here when
              a buyer submits an offer or you start a
              conversation with another user.
            </p>

            <button
              onClick={() =>
                navigate("/marketplace")
              }
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Go to Marketplace
            </button>
          </div>
        ) : (
          /*
          =================================================
          CHAT LIST
          =================================================
          */

          <div className="space-y-5">
            {chats.map((chat) => {
              /*
              =================================================
              FIND OTHER USER
              =================================================
              */

              const otherUser =
                chat.participants?.find(
                  (participant) =>
                    participant?._id?.toString() !==
                    user?._id?.toString()
                );

              /*
              =================================================
              UNREAD COUNT
              =================================================
              */

              const unread =
                user.role === "farmer"
                  ? chat.unreadCount?.farmer || 0
                  : chat.unreadCount?.buyer || 0;

              /*
              =================================================
              OFFER PRICE
              =================================================
              */

              const offerPrice =
                chat.offer?.offeredPrice;

              /*
              =================================================
              CHAT STATUS
              =================================================
              */

              const chatStatus =
                chat.status || "Active";

              return (
                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className="block bg-white rounded-2xl shadow hover:shadow-xl transition p-6"
                >
                  {/* =================================================
                      TOP SECTION
                  ================================================= */}

                  <div className="flex justify-between items-start gap-4">
                    {/* LEFT */}

                    <div className="flex gap-4 min-w-0">
                      {/* AVATAR */}

                      <div className="w-12 h-12 min-w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                        {otherUser?.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      {/* USER */}

                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-gray-800 truncate">
                          {otherUser?.fullName ||
                            "Unknown User"}
                        </h2>

                        <p className="text-gray-500">
                          {chat.listing?.cropName ||
                            "Crop discussion"}
                        </p>

                        {chat.listing?.variety && (
                          <p className="text-sm text-gray-400">
                            {chat.listing.variety}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="text-right flex-shrink-0">
                      {unread > 0 && (
                        <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 bg-red-500 text-white rounded-full text-sm font-bold">
                          {unread}
                        </span>
                      )}

                      <p className="text-sm text-gray-400 mt-2">
                        {chat.lastMessageAt
                          ? new Date(
                              chat.lastMessageAt
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      LAST MESSAGE
                  ================================================= */}

                  <div className="mt-5 bg-slate-50 rounded-xl p-4">
                    <p className="text-gray-700 truncate">
                      {chat.lastMessage ||
                        "No messages yet."}
                    </p>
                  </div>

                  {/* =================================================
                      OFFER + STATUS
                  ================================================= */}

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* STATUS */}

                      <span className="text-sm text-green-600 font-semibold">
                        ● {chatStatus}
                      </span>

                      {/* OFFER */}

                      {offerPrice !== undefined &&
                        offerPrice !== null && (
                          <span className="text-sm font-semibold text-green-700">
                            Offer: ₹
                            {Number(
                              offerPrice
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                    </div>

                    {/* OPEN CHAT */}

                    <span className="text-sm text-blue-600 font-semibold">
                      Open Chat →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;