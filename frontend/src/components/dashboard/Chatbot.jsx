import { useState } from "react";
import { Bot, Send, User } from "lucide-react";
import api from "../../services/api";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm AgriTwin AI. Ask me anything about farming.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/chatbot", {
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to contact AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-5">
        <Bot className="text-green-600" size={30} />
        <h2 className="text-2xl font-bold">
          AgriTwin AI Assistant
        </h2>
      </div>

      <div className="h-96 overflow-y-auto border rounded-xl p-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.sender === "user" ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}

                <span className="font-semibold">
                  {msg.sender === "user"
                    ? "You"
                    : "AgriTwin AI"}
                </span>
              </div>

              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-green-700 font-semibold">
            🤖 AI is typing...
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <input
          className="flex-1 border rounded-xl px-4 py-3"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-5 rounded-xl hover:bg-green-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;