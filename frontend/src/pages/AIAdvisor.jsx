import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Send,
  Mic,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import api from "../services/api";

function AIAdvisor() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "👋 Hello Farmer! I'm AgriTwin AI. Ask me anything related to farming, crops, diseases, irrigation or weather.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  /* ---------------- SPEECH RECOGNITION ---------------- */

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.start();

    recognition.onresult = (e) => {
      setMessage(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  /* ---------------- TEXT TO SPEECH ---------------- */

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  };

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/chatbot", {
        message: userMessage,
      });

      const reply =
        data.reply ||
        "I couldn't generate a response.";

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      speak(reply);
    } catch (err) {
      console.error(err);

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠ Unable to connect with AI.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  /* ---------------- CLEAR CHAT ---------------- */

  const clearChat = () => {
    if (!window.confirm("Clear all chats?")) return;

    setChat([
      {
        sender: "ai",
        text: "👋 New conversation started.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mx-auto max-w-5xl rounded-3xl bg-white shadow-xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-red-100 p-3 hover:bg-red-500 hover:text-white"
            >
              <ArrowLeft size={22}/>
            </button>

            <Bot
              size={40}
              className="text-green-600"
            />

            <div>

              <h1 className="text-3xl font-bold text-green-700">
                AgriTwin AI Advisor
              </h1>

              <p className="text-gray-500">
                Smart AI Farming Assistant
              </p>

            </div>

          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
          >
            <Trash2 size={18}/>
            Clear Chat
          </button>

        </div>

        {/* CHAT */}

        <div className="h-[560px] overflow-y-auto bg-slate-50 p-6">

          {chat.map((msg, index) => (

            <div
              key={index}
              className={`mb-5 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-xl rounded-2xl px-5 py-4 shadow ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }`}
              >

                <p>{msg.text}</p>

                <p
                  className={`mt-2 text-xs ${
                    msg.sender === "user"
                      ? "text-green-100"
                      : "text-gray-400"
                  }`}
                >
                  {msg.time}
                </p>

              </div>

            </div>

          ))}

          {loading && (
            <div className="text-green-600 animate-pulse">
              🤖 AI is thinking...
            </div>
          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* INPUT */}

        <div className="flex gap-3 border-t p-6">

          <button
            onClick={startListening}
            className={`rounded-xl px-5 text-white ${
              listening
                ? "bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Mic size={22}/>
          </button>

          <input
            className="flex-1 rounded-xl border px-5 py-3 outline-none focus:ring-2 focus:ring-green-500"
            placeholder={
              listening
                ? "Listening..."
                : "Ask your farming question..."
            }
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") sendMessage();
            }}
          />

          <button
            disabled={loading}
            onClick={sendMessage}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            <Send size={20}/>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIAdvisor;