import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Chatbot from "../components/chatbot/Chatbot";


function ChatbotPage(){

    return(

        <div className="flex min-h-screen bg-slate-100">


            <Sidebar/>


            <div className="flex-1 p-8">


                <Navbar/>


                <div className="mt-8">

                    <Chatbot/>

                </div>


            </div>


        </div>

    );

}


export default ChatbotPage;