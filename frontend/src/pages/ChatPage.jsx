import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Send,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  /* =====================================================
     FETCH CHAT
  ===================================================== */

  const fetchChat = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/chats/${chatId}`
      );

      if (data.success) {
        setChat(data.chat);
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error(
        "Fetch Chat Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to load chat."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     MARK READ
  ===================================================== */

  const markRead = async () => {
    try {
      await api.put(
        `/chats/read/${chatId}`
      );
    } catch (error) {
      console.error(
        "Mark Read Error:",
        error
      );
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    if (!chatId) return;

    const loadChat = async () => {
      await fetchChat();
      await markRead();
    };

    loadChat();
  }, [chatId]);

  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setSending(true);

      const { data } = await api.post(
        `/chats/${chatId}`,
        {
          message: message.trim(),
        }
      );

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          data.newMessage,
        ]);

        setChat((prev) => ({
          ...prev,
          lastMessage: message.trim(),
          lastMessageAt: new Date(),
        }));

        setMessage("");
      }
    } catch (error) {
      console.error(
        "Send Message Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading Chat...
        </div>
      </div>
    );
  }

  /* =====================================================
     CHAT NOT FOUND
  ===================================================== */

  if (!chat) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold">
            Chat Not Found
          </h2>

          <button
            onClick={() => navigate("/inbox")}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Go to Inbox
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
     OTHER USER
  ===================================================== */

  const otherUser =
    chat.participants?.find(
      (participant) =>
        participant._id?.toString() !==
        user._id?.toString()
    );

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white shadow px-6 py-4">

        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                navigate("/inbox")
              }
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <h1 className="text-xl font-bold">
                {otherUser?.fullName ||
                  "User"}
              </h1>

              <p className="text-sm text-gray-500">
                {chat.listing?.cropName ||
                  "Crop Negotiation"}
              </p>

            </div>

          </div>

          <button
            onClick={fetchChat}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
          >
            <RefreshCw size={18} />
          </button>

        </div>

      </div>

      {/* =================================================
          OFFER INFO
      ================================================= */}

      <div className="max-w-5xl w-full mx-auto px-4 pt-4">

        <div className="bg-white rounded-xl shadow p-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Crop
              </p>

              <p className="font-bold">
                {chat.listing?.cropName ||
                  "Crop"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Chat Status
              </p>

              <p className="font-bold text-green-600">
                {chat.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Offer
              </p>

              <p className="font-bold text-green-700">
                {chat.offer?.offeredPrice
                  ? `₹${Number(
                      chat.offer.offeredPrice
                    ).toLocaleString("en-IN")}`
                  : "No offer"}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          MESSAGES
      ================================================= */}

      <div className="flex-1 max-w-5xl w-full mx-auto p-4">

        <div className="bg-white rounded-2xl shadow min-h-[500px] max-h-[65vh] overflow-y-auto p-5">

          {messages.length === 0 ? (

            <div className="h-full min-h-[450px] flex items-center justify-center text-gray-400">
              No messages yet.
            </div>

          ) : (

            messages.map((msg) => {

              const isMine =
                msg.sender?._id?.toString() ===
                user._id?.toString();

              const isSystem =
                msg.type === "system";

              const isOffer =
                msg.type === "offer" ||
                msg.type === "counterOffer";

              if (isSystem) {
                return (
                  <div
                    key={msg._id}
                    className="flex justify-center my-4"
                  >
                    <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                      {msg.message}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg._id}
                  className={`flex mb-4 ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      isMine
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >

                    {isOffer && (
                      <p className="text-xs font-bold mb-1 opacity-80">
                        {msg.type ===
                        "counterOffer"
                          ? "COUNTER OFFER"
                          : "OFFER"}
                      </p>
                    )}

                    <p className="break-words">
                      {msg.message}
                    </p>

                    {msg.offerPrice && (
                      <p className="font-bold mt-2">
                        ₹
                        {Number(
                          msg.offerPrice
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}

                    <p
                      className={`text-xs mt-2 ${
                        isMine
                          ? "text-green-100"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.createdAt
                        ? new Date(
                            msg.createdAt
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : ""}
                    </p>

                  </div>

                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />

        </div>

      </div>

      {/* =================================================
          MESSAGE INPUT
      ================================================= */}

      <div className="bg-white border-t p-4">

        <form
          onSubmit={sendMessage}
          className="max-w-5xl mx-auto flex gap-3"
        >

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={
              sending ||
              !message.trim()
            }
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Send size={18} />

            {sending
              ? "Sending..."
              : "Send"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChatPage;