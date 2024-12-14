import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { endpoint } from "../utils/APIRoutes";
import axios from "axios";
import { useQuery } from "react-query";

function Chat({ selectedUser }) {
  const [msg, setMsg] = useState("");
  const [sender, setSender] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userId = localStorage.getItem("ID");

  // Fetch user data
  const { data } = useQuery(
    ["user"],
    async () => {
      try {
        const response = await axios.get(
          `${endpoint?.contact_list}?userId=${userId}`
        );
        return response.data;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw new Error("Error fetching data");
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const Usersdata = data?.data || [];

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setMsg((prevMessage) => prevMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  // Send message function
  const ChatFn = async () => {
    if (!msg) {
      return toast("Please Enter Any Message");
    }

    // Extract t_id from Usersdata or selectedUser, whichever is available
    const targetUser = selectedUser || Usersdata;
    const t_id = targetUser?.t_id;

    if (!t_id) {
      return toast("User ID (t_id) is missing!");
    }

    const reqbody = {
      userid: userId,
      username: targetUser?.username, // use selectedUser's username
      t_id: t_id, // use extracted t_id
      message: msg,
    };

    try {
      const response = await axios.post(endpoint?.send_message, reqbody);
      toast(response?.data?.msg);
      setSender(response?.data?.message)
      setMsg(""); // Clear message input after sending
    } catch (e) {
      console.log(e);
      toast("Failed to send the message");
    }
  };

  const { data:reciever } = useQuery(
    ["reciever"],
    async () => {
      try {
        const response = await axios.get(
          `${endpoint?.recieve_messgage}?userId=${userId}`
        );
        return response.data;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw new Error("Error fetching data");
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const recieverdata = reciever?.data || [];

  return (
    <div className="h-full flex flex-col bg-[#E5DDD5]">
      {selectedUser && (
        <div className="flex items-center p-4 bg-[#075e54] text-white">
          <img
            src={selectedUser?.img}
            alt={selectedUser?.username}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-2">
            <p className="font-semibold">{selectedUser?.username}</p>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <p className="text-xs">Active Now</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto pb-4 px-4">
      <div
            className={`flex ${sender?.message ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] !text-xs p-2 my-2 pt-1 rounded-lg ${
                sender?.message ? "bg-[#075e54] text-white" : "bg-white text-[#075e54]"
              }`}
            >
              {sender?.message}
            </div>
          </div>
        {/* Render messages here */}
         {recieverdata.map((msg, index) => (
          <div
            className={`flex ${msg?.message ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[80%] !text-xs p-2 my-2 pt-1 rounded-lg ${
                msg?.message ?  "bg-white text-[#075e54]" : "bg-[#075e54] text-white" 
              }`}
            >
              {msg?.message}
            </div>
          </div>
        ))} 
      </div>

      <div className="flex items-center p-2 bg-[#075e54] text-white relative">
        <button className="mr-2" onClick={toggleEmojiPicker}>
          😊
        </button>
        <input
          type="text"
          name="msg"
          id="msg"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg outline-none text-black"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="ml-2 text-2xl" onClick={ChatFn}>
          <IoMdSend />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
