import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ChatPage() {

  const { chatId } = useParams();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");



  useEffect(() => {

    loadChat();

  }, [chatId]);



  const loadChat = async () => {

    try {

      const { data } =
        await api.get(`/chat/${chatId}`);

      if (data.success) {

        setChat(data.chat);

        setMessages(data.chat.messages || []);

        await api.put(`/chat/read/${chatId}`);

      }

    } catch (err) {

      console.log(err);

    }

  };



  const sendMessage = async () => {

    if (!text.trim()) return;

    try {

      await api.post(`/chat/${chatId}`, {

        text,

      });

      setText("");

      loadChat();

    } catch (err) {

      console.log(err);

    }

  };



  if (!chat) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading Chat...

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-green-700 text-white p-6">

        <h1 className="text-2xl font-bold">

          {chat.listing?.cropName}

        </h1>

        <p>

          {chat.status}

        </p>

      </div>



      <div className="max-w-5xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow h-[65vh] overflow-y-auto p-6">

          {messages.length === 0 ? (

            <div className="text-center text-gray-500 mt-20">

              No Messages Yet

            </div>

          ) : (

            messages.map((msg) => (

              <div

                key={msg._id}

                className={`mb-4 ${
                  msg.sender._id === user._id
                    ? "text-right"
                    : "text-left"
                }`}

              >

                <div

                  className={`inline-block rounded-2xl px-5 py-3 max-w-md ${
                    msg.sender._id === user._id
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}

                >

                  <p className="font-semibold">

                    {msg.sender.fullName}

                  </p>

                  <p>

                    {msg.text}

                  </p>

                </div>

              </div>

            ))

          )}

        </div>



        <div className="bg-white rounded-xl shadow p-4 mt-4 flex gap-3">

          <input

            className="flex-1 border rounded-xl p-3"

            placeholder="Type a message..."

            value={text}

            onChange={(e) =>

              setText(e.target.value)

            }

          />



          <button

            onClick={sendMessage}

            className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl"

          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}

export default ChatPage;