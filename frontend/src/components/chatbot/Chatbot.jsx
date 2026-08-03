import { useState } from "react";
import { Bot, Send } from "lucide-react";

import api from "../../services/api";


function Chatbot(){

    const [message,setMessage] = useState("");
    const [chat,setChat] = useState([
        {
            sender:"ai",
            text:"👋 Hello! I'm AgriTwin AI. Ask me anything about farming."
        }
    ]);

    const [loading,setLoading] = useState(false);



    const sendMessage = async()=>{


        if(!message.trim()) return;


        const userMessage = message;


        setChat(prev=>[
            ...prev,
            {
                sender:"user",
                text:userMessage
            }
        ]);


        setMessage("");

        setLoading(true);



        try{


            const {data}=await api.post(
                "/chatbot",
                {
                    message:userMessage
                }
            );



            setChat(prev=>[

                ...prev,

                {
                    sender:"ai",
                    text:data.reply || 
                    "No response available."
                }

            ]);



        }
        catch(error){


            setChat(prev=>[

                ...prev,

                {
                    sender:"ai",
                    text:"AI service unavailable."
                }

            ]);

        }
        finally{

            setLoading(false);

        }


    };



    return(

        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto">


            <div className="flex items-center gap-3 mb-6">


                <Bot
                    size={35}
                    className="text-green-600"
                />


                <div>

                    <h1 className="text-3xl font-bold">
                        AgriTwin AI Assistant
                    </h1>


                    <p className="text-gray-500">
                        Your smart farming companion
                    </p>

                </div>


            </div>





            <div className="h-[450px] overflow-y-auto bg-slate-50 rounded-2xl p-5 space-y-4">


                {
                    chat.map((item,index)=>(

                        <div
                        key={index}
                        className={
                            item.sender==="user"
                            ?
                            "flex justify-end"
                            :
                            "flex justify-start"
                        }
                        >

                            <div
                            className={
                                item.sender==="user"
                                ?
                                "bg-green-600 text-white p-3 rounded-2xl max-w-lg"
                                :
                                "bg-white shadow p-3 rounded-2xl max-w-lg"
                            }
                            >

                                {item.text}

                            </div>

                        </div>

                    ))
                }


                {
                    loading &&
                    <p className="text-gray-500">
                        🤖 Thinking...
                    </p>
                }


            </div>




            <div className="flex gap-3 mt-5">


                <input

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

                onKeyDown={(e)=>{
                    if(e.key==="Enter")
                    sendMessage();
                }}

                placeholder="Ask anything..."

                className="flex-1 border rounded-xl px-5 py-3 outline-none"

                />



                <button

                onClick={sendMessage}

                className="bg-green-600 text-white px-5 rounded-xl"

                >

                    <Send/>

                </button>


            </div>


        </div>

    );

}


export default Chatbot;