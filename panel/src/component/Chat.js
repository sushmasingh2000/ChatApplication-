// import EmojiPicker from "emoji-picker-react";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { IoMdSend } from "react-icons/io";

// function Chat({ selectedUser }) {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleSendMessage = () => {
//   if(!message){
//     return toast("Please Enter Any Message")
//   }

//     const newMessage = {
//       text: message,
//       sender: "me",
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessage("");
//   };

//   const handleEmojiClick = (emoji) => {
//     setMessage((prevMessage) => prevMessage + emoji.emoji);
//     setShowEmojiPicker(false);
//   };

//   const toggleEmojiPicker = () => {
//     setShowEmojiPicker((prev) => !prev);
//   };

//   return (
//     <div className="h-full flex flex-col bg-[#E5DDD5]">
//       {selectedUser && (
//         <div className="flex items-center p-4 bg-[#075e54] text-white">
//           <img
//             src={selectedUser?.img}
//             alt={selectedUser?.username}
//             className="h-10 w-10 rounded-full"
//           />
//           <div className="ml-2">
//             <p className="font-semibold">{selectedUser?.username}</p>
//             <div className="flex items-center space-x-1">
//               <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
//               <p className="text-xs">Active Now</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 overflow-auto pb-4 px-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[80%] !text-xs p-2 my-2 pt-1 rounded-lg ${msg.sender === "me"
//                 ? "bg-[#075e54] text-white"
//                 : "bg-white text-[#075e54]"}`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center p-2 bg-[#075e54] text-white relative">
//         <button
//           className="mr-2"
//           onClick={toggleEmojiPicker}
//         >
//           😊
//         </button>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 px-3 py-2 rounded-lg outline-none text-black"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           className="ml-2 text-2xl"
//           onClick={handleSendMessage}
//         >
//           <IoMdSend />
//         </button>

//         {showEmojiPicker && (
//           <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Chat;


import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

function Chat({ selectedUser, setSelectedUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Retrieve currentUser from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    if (selectedUser) {
      // Retrieve messages for the selectedUser from localStorage
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const userMessages = storedMessages.filter(msg => 
        (msg.sender === currentUser.id && msg.receiver === selectedUser.id) || 
        (msg.sender === selectedUser.id && msg.receiver === currentUser.id)
      );
console.log(userMessages)

      setMessages(userMessages);
    }
  }, [selectedUser, currentUser.id]);

  const handleSendMessage = () => {
    if (!message) {
      return toast("Please Enter Any Message");
    }

    const newMessage = {
      text: message,
      sender: currentUser.id,
      receiver: selectedUser.id,
      timestamp: new Date(),
    };

    // Store new messages in localStorage
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    storedMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(storedMessages));

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage(""); // Clear input field
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === currentUser.id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] !text-xs p-2 my-2 pt-1 rounded-lg ${msg.sender === currentUser.id
                ? "bg-[#075e54] text-white"
                : "bg-white text-[#075e54]"}`}
            >
              {msg.text}
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
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg outline-none text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 text-2xl"
          onClick={handleSendMessage}
        >
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
