import React, { useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import RoundedBtn from "../Common/Roundedbtn";
import profile from "../images/pp.png";
import Chat from "./Chat";
import LoadingScreen from "./Loadingscreen";
import UserList from "./UserList";

function Home() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="h-screen flex">
          <div className="w-[30%] bg-[#075e54] text-white p-2 flex flex-col">
            <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3">
              <img src={profile} alt="profile_picture" className="rounded-full w-[40px]" />
              <div className="flex justify-between w-[175px]">
                <RoundedBtn icon={<MdPeopleAlt />} />
                <RoundedBtn icon={<TbCircleDashed />} />
                <RoundedBtn icon={<BsFillChatLeftTextFill />} />
                <RoundedBtn onClick={() => navigate('/setting')} icon={<HiDotsVertical />} />
              </div>
            </div>
            {/* <div className="flex flex-col mt-1  cursor-pointer h-100">
              <div className="flex justify-between items-center w-100 min-h-[55px] px-5 hover:bg-[#202d33]">
                <h1 className="text-white">Archived</h1>
                <p className="text-emerald-500 text-xs font-bold">7</p>
              </div>
            </div> */}
            <UserList setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
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
      )}
    </>
  );

}

export default Home;
