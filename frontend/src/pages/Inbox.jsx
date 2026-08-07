import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";

function Inbox() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  /* =====================================================
     FETCH CHATS
  ===================================================== */

  const fetchChats = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/chats");

      if (data.success) {
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error(
        "Inbox Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to load inbox."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading Inbox...
        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <div className="bg-white shadow px-6 md:px-8 py-5">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => {
                navigate(
                  user.role === "buyer"
                    ? "/buyer-dashboard"
                    : "/dashboard"
                );
              }}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div>

              <h1 className="text-2xl md:text-3xl font-bold">
                📩 Inbox
              </h1>

              <p className="text-gray-500 text-sm">
                Your active buyer and farmer conversations
              </p>

            </div>

          </div>

          <button
            onClick={fetchChats}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="max-w-6xl mx-auto p-6 md:p-8">

        {chats.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <MessageCircle
              size={60}
              className="mx-auto text-gray-400 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Conversations Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Once a buyer sends an offer,
              conversations will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {chats.map((chat) => {

              const otherUser =
                chat.participants?.find(
                  (participant) =>
                    participant._id?.toString() !==
                    user._id?.toString()
                );

              const unread =
                user.role === "farmer"
                  ? chat.unreadCount?.farmer || 0
                  : chat.unreadCount?.buyer || 0;

              return (

                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className="block bg-white rounded-2xl shadow hover:shadow-xl transition p-6"
                >

                  <div className="flex justify-between items-start gap-4">

                    {/* LEFT */}

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">

                        {otherUser?.fullName
                          ?.charAt(0)
                          ?.toUpperCase() ||
                          "U"}

                      </div>

                      <div>

                        <h2 className="text-xl font-bold">
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

                    <div className="text-right">

                      {unread > 0 && (
                        <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 bg-red-500 text-white rounded-full text-sm font-bold">
                          {unread}
                        </span>
                      )}

                      <p className="text-sm text-gray-400 mt-2">
                        {chat.lastMessageAt
                          ? new Date(
                              chat.lastMessageAt
                            ).toLocaleString()
                          : ""}
                      </p>

                    </div>

                  </div>

                  {/* OFFER */}

                  {chat.offer && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">

                      <div className="flex justify-between">

                        <span className="text-sm text-green-700">
                          Current Offer
                        </span>

                        <span className="font-bold text-green-700">
                          ₹
                          {Number(
                            chat.offer.offeredPrice ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                    </div>
                  )}

                  {/* LAST MESSAGE */}

                  <div className="mt-4 bg-slate-50 rounded-xl p-4">

                    <p className="text-gray-700 truncate">
                      {chat.lastMessage ||
                        "No messages yet."}
                    </p>

                  </div>

                  {/* STATUS */}

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-sm text-green-600 font-semibold">
                      ● {chat.status}
                    </span>

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