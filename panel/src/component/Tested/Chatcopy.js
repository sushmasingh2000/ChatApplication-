import EmojiPicker from "emoji-picker-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { endpoint } from "../utils/APIRoutes";
import axios from "axios";
import moment from "moment";
import { useQuery, useQueryClient } from "react-query";

function Chat({ selectedUser }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [storedMessages, setStoredMessages] = useState([]);
  const userId = localStorage.getItem("ID");
  const name = localStorage.getItem("name");
  const client = useQueryClient();

  const { data } = useQuery(
    ["contact"],
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
  
  const contactdata = data?.data || [];

  useEffect(() => {
    const messages = JSON?.parse(localStorage?.getItem("sentMessages")) || [];
    setStoredMessages(messages);
  }, []);

  const handleEmojiClick = (emoji) => {
    setMsg((prevMessage) => prevMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    // const seconds = now.getSeconds().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`; 
};

  

  const ChatFn = async () => {
    if (!msg) {
      return toast("Please Enter Any Message");
    }
    if (!contactdata?.[0]?.t_id) {
      return toast("t_id is missing!");
    }

    const reqbody = {
      userid: userId,
      username: name,
      t_id: contactdata?.[0]?.t_id,
      message: msg,
      time : getCurrentTime()
    };

    try {
      const response = await axios.post(endpoint?.send_message, reqbody);
      toast(response?.data?.msg);
      client.refetchQueries("reciever");
      setMsg("");
      const updatedMessages = [
        ...storedMessages,
        { ...response?.data?.message},
      ];
      setStoredMessages(updatedMessages);
      localStorage.setItem("sentMessages", JSON.stringify(updatedMessages));

    } catch (e) {
      console.log(e);
      toast("Failed to send the message");
    }
  };

  const { data: reciever } = useQuery(
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
      refetchInterval: 5000, 
      refetchIntervalInBackground: true, 
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
        {storedMessages?.map((sender, index) => (
          <div
            key={index}
            className={`flex ${sender?.message ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] !text-xs px-2 my-2 p-1 rounded-lg ${sender?.message
                ? "bg-[#075e54] text-white" 
                : "bg-white text-[#075e54]"}`}
            >
              {sender?.message} <span className="!text-white !font-bold !text-[8px]"><sub>{moment?.utc(sender?.time)?.format("HH:mm")}</sub></span>

            </div>
          </div>
        ))}

        {recieverdata?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg?.message ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%]  !text-xs px-2 my-2 p-1 rounded-lg ${msg?.message
                ? "bg-white text-[#075e54]" 
                : "bg-[#075e54] text-white"}`}
            >
              {msg?.message} <span className="!text-black !font-bold !text-[8px]"><sub>{moment?.(msg?.time)?.format("HH:mm")}</sub></span>
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


{/* <div className="flex-1 overflow-auto pb-4 px-4">
      <div
            className={`flex justify-end`}
          >
            <div
              className={`max-w-[80%] !text-xs px-2 my-2 p-1 rounded-lg bg-[#075e54] text-white`}
            >
              Hii  <span className="!text-white !font-bold !text-[8px]"><sub>11:3</sub></span>

            </div>
          </div>
          <div
            className={`flex justify-start`}
          >
            <div
              className={`max-w-[80%] !text-xs px-2 my-2 p-1 rounded-lg bg-white text-[#075e54]`}
            >
              Hlo  <span className="!text-black !font-bold !text-[8px]"><sub>11:03</sub></span>

            </div>
          </div>
          <div
            className={`flex justify-end`}
          >
            <div
              className={`max-w-[80%] !text-xs px-2 my-2 p-1 rounded-lg bg-[#075e54] text-white`}
            >
              How are you  <span className="!text-white !font-bold !text-[8px]"><sub>11:5</sub></span>

            </div>
          </div>
          <div
            className={`flex justify-start`}
          >
            <div
              className={`max-w-[80%] !text-xs px-2 my-2 p-1 rounded-lg bg-white text-[#075e54]`}
            >
              Fine u  <span className="!text-black !font-bold !text-[8px]"><sub>11:07</sub></span>

            </div>
          </div>
      </div> */}