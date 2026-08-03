import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Inbox() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chat");

      if (data.success) {
        setChats(data.chats);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading Inbox...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-white shadow p-6">

        <h1 className="text-3xl font-bold">
          📩 Inbox
        </h1>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        {chats.length === 0 ? (

          <div className="bg-white rounded-xl p-10 text-center shadow">

            <h2 className="text-2xl font-bold">
              No Conversations Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Once an offer is sent, chats will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {chats.map((chat) => {

              const otherUser =
                chat.participants.find(
                  (p) => p._id !== user._id
                );

              return (

                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className="block bg-white rounded-xl shadow hover:shadow-lg transition p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">
                        {otherUser?.fullName}
                      </h2>

                      <p className="text-gray-500">
                        {chat.listing?.cropName}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-semibold text-green-700">
                        {chat.status}
                      </p>

                      <p className="text-sm text-gray-400">
                        {new Date(
                          chat.lastMessageAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <p className="mt-4 text-gray-700">
                    {chat.lastMessage}
                  </p>

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