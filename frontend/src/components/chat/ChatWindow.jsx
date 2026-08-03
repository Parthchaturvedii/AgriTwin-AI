import { useEffect, useState } from "react";
import api from "../../services/api";

function ChatWindow({ chat }) {

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {

        loadMessages();

    }, [chat]);

    const loadMessages = async () => {

        const { data } = await api.get(
            `/chat/${chat._id}/messages`
        );

        setMessages(data.messages);

    };

    const sendMessage = async () => {

        if (!text.trim()) return;

        await api.post(
            `/chat/${chat._id}/messages`,
            {
                message: text,
            }
        );

        setText("");

        loadMessages();

    };

    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div className="flex flex-col h-full">

            {/* Header */}

            <div className="bg-white shadow p-5">

                <h2 className="text-xl font-bold">

                    Negotiation Chat

                </h2>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-5 bg-slate-50">

                {

                    messages.map(msg => (

                        <div
                            key={msg._id}
                            className={`mb-4 flex ${
                                msg.sender._id === currentUser._id
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >

                            <div
                                className={`px-5 py-3 rounded-2xl max-w-md ${
                                    msg.sender._id === currentUser._id
                                        ? "bg-green-600 text-white"
                                        : "bg-white shadow"
                                }`}
                            >

                                {msg.message}

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Bottom */}

            <div className="bg-white p-5 flex gap-3">

                <input
                    className="flex-1 border rounded-xl p-3"
                    placeholder="Type your message..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                />

                <button
                    onClick={sendMessage}
                    className="bg-green-600 text-white px-8 rounded-xl"
                >

                    Send

                </button>

            </div>

        </div>

    );

}

export default ChatWindow;