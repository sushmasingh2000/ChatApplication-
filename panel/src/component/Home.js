import React, { useState } from "react";
import Chat from "./Chat";
import UserList from "./UserList";
import { IoIosSettings, IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("name")

  return (
    <div className="h-screen flex">
      <div className="w-[30%] bg-[#075e54] text-white p-2 flex flex-col">
        <div className="flex justify-between items-center m-3">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-xl py-2 font-semibold">WhatsApp</h1>
          </div>
          <IoIosSettings
            className="text-white cursor-pointer"
            size={30}
            onClick={() => navigate('/setting')} 
          />
        </div>
       
        <UserList setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
     
        <div className="flex justify-between ">
        <div className="mt-3 mx-4  flex justify-start items-center gap-2 ">
        <img src="data:image/jpeg;base64,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" alt="" className="w-10 h-10 rounded-full"/>
      {username || "No Name"}
        </div> 
        
        <IoMdNotifications className="mt-4 h-8 w-10"/>
        </div>
      </div>
      <div className="w-[70%] bg-[#E5DDD5] flex flex-col">
        {selectedUser ? (
          <Chat selectedUser={selectedUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-semibold text-[#075e54] mb-4">Welcome to WhatsApp!</h2>
            <p className="text-gray-600 mb-6">Please select a user to start chatting.</p>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.72V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4.72a2 2 0 00-1 1.732V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v3.452a2 2 0 00-1-1.732V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v16a2 2 0 002 2h2a2 2 0 002-2v-7.204a2 2 0 001 1.732V19a2 2 0 002 2h4a2 2 0 002-2v-3.568a2 2 0 001-1.732V12.72a2 2 0 00-1-1.732z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
