import React, {
    useState,
    useEffect
  } from "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
  import ReactDOM from "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
  import {
    IoMdClose,
    IoMdAdd,
    IoIosSearch,
    IoIosPeople,
    IoMdFlashOff,
    IoMdFlash,
    IoIosArrowUp,
    IoMdSend,
    IoMdAttach
  } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/io/index.esm.js";
  import {
    MdPhotoSizeSelectActual,
    MdCall,
    MdInfoOutline,
    MdMessage,
    MdVideocam
  } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/md/index.esm.js";
  import {
    FaPhone,
    FaVolumeUp,
    FaArrowLeft,
    FaVideo,
    FaMicrophone,
    FaLock,
    FaCamera
  } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/fa/index.esm.js";
  import {
    IoCall,
    IoCameraOutline,
    IoLink,
    IoCheckmarkDoneSharp
  } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/io5/index.esm.js";
  import {
    HiDotsVertical,
    HiOutlineRefresh
  } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/hi/index.esm.js";
  import { GrEmoji } from "https://cdn.skypack.dev/pin/react-icons@v4.1.0-REijSZ06bhLCgbLVhL2V/mode=imports,min/unoptimized/gr/index.esm.js";
  
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: { ...tailwind.colors.teal, DEFAULT: "#008E6B" }
        }
      }
    }
  };
  
  const defaultChats = [
    {
      id: 3,
      name: "Elon Musk",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoHR4N4fK95SQ6cyL0knP9vAMcWa2hrjNh2lv-c4wbA&s",
      unread: 0,
      messages: [
        {
          me: true,
          text: "Hey Elon! What's the next big thing you're working on?",
          time: "11:45 AM"
        },
        {
          me: false,
          text:
            "Thinking about a Mars vacation or maybe a new electric rocket car. You in?",
          time: "11:50 AM"
        },
        {
          me: true,
          text: "Sign me up for the Mars trip! Can I pay in Dogecoin?",
          time: "11:55 AM"
        },
        {
          me: false,
          text: "Of course! It's the currency of the future, after all. 😄",
          time: "12:00 PM"
        },
        {
          me: true,
          text:
            "But Elon, what about a Tesla that can fly? Imagine the traffic solutions!",
          time: "12:05 PM"
        },
        {
          me: false,
          text:
            "Flying Teslas? Now that's an interesting idea. We might need to work on a landing pad feature.",
          time: "12:10 PM"
        },
        {
          me: true,
          text: "A landing pad on top of my house for the Tesla Flyer? I'm in!",
          time: "12:15 PM"
        },
        {
          me: false,
          text:
            "Great! We'll call it 'Tesla Flyer: Taking Commutes to New Heights'. Catchy, right?",
          time: "12:20 PM"
        },
        {
          me: true,
          text:
            "Absolutely! I can already see the headlines. Let's make it happen, Elon!",
          time: "12:25 PM"
        }
      ]
    },
    {
      id: 1,
      name: "Dwayne Johnson",
      image:
        "https://pbs.twimg.com/profile_images/3478244961/01ebfc40ecc194a2abc81e82ab877af4_400x400.jpeg",
      unread: 3,
      messages: [
        {
          me: true,
          text: "Hey Rock! Can you smell what I'm cooking?",
          time: "08:00 AM"
        },
        { me: false, text: "Haha! You got me! What's up?", time: "08:05 AM" },
        {
          me: true,
          text: "Just wanted to say hello to the People's Champion!",
          time: "08:10 AM"
        },
        {
          me: false,
          text: "Hello back to all the fans out there!",
          time: "08:15 AM"
        },
        {
          me: true,
          text: "You're the man, Rock! Keep inspiring!",
          time: "08:20 AM"
        }
      ]
    },
    {
      id: 2,
      name: "Ellen DeGeneres",
      image:
        "https://pbs.twimg.com/profile_images/1478120772044574724/v-dDUYb7_400x400.jpg",
      unread: 1,
      messages: [
        {
          me: false,
          text: "Hi Ellen! You always make me laugh. How do you do it?",
          time: "09:30 AM"
        },
        {
          me: true,
          text:
            "It's all about dancing, kindness, and a little bit of mischief! 😉",
          time: "09:35 AM"
        },
        {
          me: false,
          text: "Haha! Your positivity is contagious. Keep spreading joy!",
          time: "09:40 AM"
        }
      ]
    },
    {
      id: 4,
      name: "Virat Kohli",
      image:
        "https://dpwishes.com/wp-content/uploads/2023/10/virat-kohli-dp-smiling-photo-virat-kohli.jpg",
      unread: 2,
      messages: [
        {
          me: true,
          text: "Hey Virat! How's it going on the cricket field?",
          time: "01:00 PM"
        },
        {
          me: false,
          text:
            "Hey! It's been good. Just practicing the cover drive and all. How about you?",
          time: "01:05 PM"
        },
        {
          me: true,
          text:
            "I'm just here, trying to hit home runs with imaginary flying Teslas. 😅",
          time: "01:10 PM"
        }
      ]
    },
    {
      id: 10,
      name: "Mukesh Ambani",
      image:
        "https://i.pinimg.com/474x/ae/d0/25/aed025d212b0732ae778bd7329d5e1d5.jpg",
      unread: 0,
      messages: [
        {
          me: true,
          text:
            "Hello Mukesh! Your business empire is impressive. Any trade secrets to share?",
          time: "04:00 PM"
        },
        {
          me: false,
          text:
            "Secret ingredient: a good cup of chai. The answer to all business problems! ☕",
          time: "04:05 PM"
        },
        {
          me: true,
          text:
            "Chai power! I'll keep that in mind for my next business meeting.",
          time: "04:10 PM"
        }
      ]
    },
    {
      id: 5,
      name: "Priyanka Chopra",
      image:
        "https://pbs.twimg.com/profile_images/1366358223448514571/aWPlksSQ_400x400.jpg",
      unread: 1,
      messages: [
        {
          me: false,
          text:
            "Hi Priyanka! Your latest movie was amazing. How do you manage to be so versatile?",
          time: "02:30 PM"
        },
        {
          me: true,
          text:
            "Thank you! It's all about embracing every role and enjoying the process. What's your favorite movie?",
          time: "02:35 PM"
        }
      ]
    },
    {
      id: 14,
      name: "Jeff Bezos",
      image:
        "https://img.readthistwice.com/unsafe/640x640/persons/jeff-bezos.jpg",
      unread: 2,
      messages: [
        {
          me: true,
          text: "Hey Jeff! Amazon is amazing. How did you come up with the idea?",
          time: "02:30 PM"
        },
        {
          me: false,
          text:
            "Glad you like it! Started as an online bookstore idea and evolved. Always focus on the customer!",
          time: "02:35 PM"
        },
        {
          me: true,
          text:
            "Customer obsession, got it! Any tips for aspiring entrepreneurs?",
          time: "02:40 PM"
        },
        {
          me: false,
          text:
            "Stay focused, take risks, and innovate. Oh, and enjoy the journey!",
          time: "02:45 PM"
        }
      ]
    },
    {
      id: 15,
      name: "Bill Gates",
      image:
        "https://media.gettyimages.com/id/1247163886/photo/london-england-microsoft-founder-bill-gates-reacts-during-a-visit-with-britains-prime.jpg?s=612x612&w=gi&k=20&c=w3UhMel1xoBLu8OijypVzwXMFLMzJwf9cngTlnL4Zlw=",
      unread: 1,
      messages: [
        {
          me: false,
          text:
            "Hi Bill! Your work in tech and philanthropy is inspiring. What's your secret to success?",
          time: "03:15 PM"
        },
        {
          me: true,
          text:
            "Continuous learning, embracing challenges, and giving back. Plus, a little bit of coding! 😄",
          time: "03:20 PM"
        },
        {
          me: false,
          text: "Coding is a superpower! Thanks for the advice, Bill.",
          time: "03:25 PM"
        }
      ]
    },
    {
      id: 18,
      name: "Donald Trump",
      image:
        "https://pbs.twimg.com/profile_images/736392853992001537/eF4LJLkn_400x400.jpg",
      unread: 2,
      messages: [
        {
          me: true,
          text:
            "Hey Donald! Your tweets are legendary. How do you come up with such catchy phrases?",
          time: "06:00 PM"
        },
        {
          me: false,
          text:
            "It's all about the art of the deal, my friend! I have the best words, believe me.",
          time: "06:05 PM"
        },
        {
          me: true,
          text: "The best words indeed! Any advice for negotiating with my cat?",
          time: "06:10 PM"
        },
        {
          me: false,
          text:
            "Cats are tough negotiators. Offer them treats and build a wall of scratching posts. It's a win-win!",
          time: "06:15 PM"
        },
        {
          me: true,
          text:
            "Great advice! I'll build a fortress of treats. Thanks, Mr. Trump!",
          time: "06:20 PM"
        },
        {
          me: false,
          text: "You're welcome! Make negotiations purrfect again!",
          time: "06:25 PM"
        }
      ]
    },
    {
      id: 19,
      name: "Sundar Pichai",
      image:
        "https://qph.cf2.quoracdn.net/main-qimg-d9d95d6982420e60b223a9909eb9fc53-lq",
      unread: 1,
      messages: [
        {
          me: false,
          text:
            "Hi Sundar! Google is a part of my daily life. How do you manage such a vast empire?",
          time: "07:30 PM"
        },
        {
          me: true,
          text:
            "With a little bit of search magic and a dash of machine learning. Keeps things interesting! 🚀",
          time: "07:35 PM"
        },
        {
          me: false,
          text: "Impressive! Can I Google how to be as successful as you?",
          time: "07:40 PM"
        },
        {
          me: true,
          text:
            "You're welcome to try, but no guarantees on the search results! 😁",
          time: "07:45 PM"
        }
      ]
    }
  ];
  
  const status = [
    {
      id: 1,
      name: "Elon Musk",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoHR4N4fK95SQ6cyL0knP9vAMcWa2hrjNh2lv-c4wbA&s",
      status: "https://source.unsplash.com/random/360×760?science",
      time: "1 hour ago"
    },
    {
      id: 2,
      name: "Virat Kohli",
      image:
        "https://dpwishes.com/wp-content/uploads/2023/10/virat-kohli-dp-smiling-photo-virat-kohli.jpg",
      status: "https://source.unsplash.com/random/360×760?Virat Kohli,cricket",
      time: "2 hour ago"
    },
    {
      id: 3,
      name: "Jeff Bezos",
      image:
        "https://img.readthistwice.com/unsafe/640x640/persons/jeff-bezos.jpg",
      status: "https://source.unsplash.com/random/360×760?amazon",
      time: "5 hour ago"
    }
  ];
  
  const defaultCallLogs = [
    {
      name: "Elon Musk",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoHR4N4fK95SQ6cyL0knP9vAMcWa2hrjNh2lv-c4wbA&s",
      outgoing: false,
      type: "audio",
      time: "11:45 AM"
    },
  
    {
      name: "Dwayne Johnson",
      image:
        "https://pbs.twimg.com/profile_images/3478244961/01ebfc40ecc194a2abc81e82ab877af4_400x400.jpeg",
      outgoing: false,
      type: "video",
      time: "11:50 AM"
    },
    {
      name: "Jeff Bezos",
      image:
        "https://img.readthistwice.com/unsafe/640x640/persons/jeff-bezos.jpg",
      type: "audio",
      outgoing: false,
      time: "12:05 AM"
    },
    {
      name: "Elon Musk",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoHR4N4fK95SQ6cyL0knP9vAMcWa2hrjNh2lv-c4wbA&s",
      outgoing: true,
      type: "audio",
      time: "1:45 AM"
    },
    {
      name: "Jeff Bezos",
      image:
        "https://img.readthistwice.com/unsafe/640x640/persons/jeff-bezos.jpg",
      outgoing: false,
      type: "video",
      time: "05:10 AM"
    }
  ];
  
  const CameraPage = ({ setIsCameraOpen }) => {
    const [flashlighOn, setFlashlighOn] = useState(false);
  
    return (
      <section className="bg-black text-white min-h-screen">
        <div className="flex justify-between px-6 pt-6">
          <IoMdClose
            className="text-2xl"
            onClick={() => setIsCameraOpen(false)}
          />
  
          {flashlighOn ? (
            <IoMdFlash
              className="text-2xl"
              onClick={() => setFlashlighOn(false)}
            />
          ) : (
            <IoMdFlashOff
              className="text-2xl"
              onClick={() => setFlashlighOn(true)}
            />
          )}
  
          <div className="flex items-center px-6 justify-between fixed w-full left-0 bottom-12">
            <MdPhotoSizeSelectActual className="text-2xl" />
            <div className="bg-white rounded-full h-16 w-16 relative">
              <div className="bg-black absolute rounded-full inset-1">
                <div className="bg-white absolute rounded-full inset-2"></div>
              </div>
            </div>
            <HiOutlineRefresh className="text-2xl" />
          </div>
        </div>
      </section>
    );
  };
  
  const StatusPage = ({ status, setSelectedStatus }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setSelectedStatus(null);
            clearInterval(interval);
            return 0;
          }
  
          return prev + 2;
        });
      }, 100);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <section className="bg-black text-white min-h-screen flex items-center justify-center relative">
        <div
          className="absolute top-0 left-0 bg-white/75 rounded-full h-1 transition-all ease-linear z-50"
          style={{ width: `${progress}%` }}
        ></div>
  
        <div className="flex gap-3 items-center py-3 px-2 top-0 fixed left-0 w-full bg-black/50">
          <FaArrowLeft
            className="text-xl"
            onClick={() => setSelectedStatus(null)}
          />
  
          <div
            className="grid grid-cols-[2.75rem_1fr] items-center gap-3"
            onClick={() => setIsCameraOpen(true)}
          >
            <img
              className="rounded-full bg-gray-600 w-11 h-11 object-cover"
              src={status.image}
            />
            <div>
              <h4 className="font-medium">{status.name}</h4>
              <p className="text-sm text-white/70 flex justify-between">
                {status.time}
              </p>
            </div>
          </div>
        </div>
  
        <img src={status.status} className="block w-full" />
  
        <div className="fixed bg-black/0 text-white/90 w-full bottom-0 left-0 py-4 text-center ">
          <IoIosArrowUp className="text-3xl mx-auto animate-bounce" />
          <p className="text-sm">Reply</p>
        </div>
      </section>
    );
  };
  
  const CallingPage = ({ isCalling: callingData, setIsCalling, setCallLogs }) => {
    useEffect(() => {
      setCallLogs((prev) => [
        {
          ...callingData,
          outgoing: true,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })
        },
        ...prev
      ]);
    }, []);
  
    return (
      <section
        className={`text-center min-h-screen ${
          callingData.type == "video"
            ? "bg-black"
            : "bg-cover bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]"
        } `}
      >
        <header
          className={`p-5 text-white ${
            callingData.type == "video" ? "bg-black" : "bg-primary"
          }`}
        >
          <p className="text-white/75 text-sm">
            {" "}
            <FaLock className="inline" /> <span>End to End encrypted</span>{" "}
          </p>
  
          <img
            src={callingData.image}
            className="rounded-full w-20 h-20 block mx-auto object-cover mt-6"
          />
          <h3 className="mt-2 text-2xl">{callingData.name}</h3>
          <h4 className="text-white/90 animate-pulse">Ringing...</h4>
        </header>
  
        <div
          className="fixed bottom-28 left-1/2 -translate-x-1/2 rounded-full bg-red-500 p-5 text-xl"
          onClick={() => setIsCalling(false)}
        >
          <FaPhone className="rotate-90 text-white/90" />
        </div>
  
        <div
          className={`fixed bottom-0 left-0 w-full py-8 px-10 flex justify-between items-center text-white/90 text-2xl ${
            callingData.type == "video" ? "bg-black" : "bg-primary"
          }`}
        >
          <FaVolumeUp />
          <FaVideo />
          <FaMicrophone />
        </div>
      </section>
    );
  };
  
  const ChatPage = ({
    chats,
    selectedChat,
    setChats,
    setSelectedChat,
    setIsCameraOpen,
    setIsCalling
  }) => {
    const currentChat = chats.find(({ id }) => id === selectedChat);
    const className =
      "w-max max-w-[80%] py-1 px-1.5 rounded-lg shadow-md text-sm text-black flex  items-end";
  
    useEffect(() => {
      if (currentChat.unread) {
        setChats(
          chats.map((chat) => ({
            ...chat,
            unread: chat.id === selectedChat ? 0 : chat.unread
          }))
        );
      }
    }, []);
  
    const onSubmit = (e) => {
      e.preventDefault();
      const msg = e.target.msg.value;
      e.target.reset();
  
      setChats(
        chats.map((chat) => {
          if (chat.id === selectedChat) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  text: msg,
                  me: true,
                  time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    seconds: false
                  })
                }
              ]
            };
          }
          return chat;
        })
      );
    };
  
    return (
      <main className="min-h-screen bg-cover bg-fixed bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]">
        <header className="bg-primary-600 sticky top-0 flex items-center justify-center py-2.5 px-2 text-white gap-3 z-30">
          <FaArrowLeft
            className="text-xl"
            onClick={() => setSelectedChat(null)}
          />
          <img
            src={currentChat.image}
            className="rounded-full w-10 h-10 object-cover"
          />
  
          <div className="flex flex-col mr-auto">
            <h4 className="font-medium">{currentChat.name}</h4>
            <p className="text-xs text-white/80">online</p>
          </div>
  
          <FaVideo
            className="text-xl"
            onClick={() => setIsCalling({ ...currentChat, type: "video" })}
          />
          <IoCall
            className="text-xl mx-1"
            onClick={() => setIsCalling(currentChat)}
          />
          <HiDotsVertical className="text-xl mr-1" />
        </header>
  
        <section className="flex flex-col gap-3 p-2 relative pb-44">
          <p className="bg-amber-200 block w-11/12 mx-auto p-2.5 rounded-lg shadow-md text-center text-black/70 text-xs my-4">
            <FaLock className="inline" /> Messages and calls are end-to-end
            encrypted. No one outside of this chat, not even WhatsApp, can read or
            listen to them. Tap to learn more
          </p>
  
          {currentChat.messages.map(({ text, me, time }, i) => (
            <div
              key={i}
              className={`${
                me ? "bg-green-100 ml-auto" : "bg-white"
              } ${className} ${text.length < 25 ? "flex-row gap-2" : "flex-col"}`}
            >
              <p className="py-0.5 px-1.5">{text}</p>
  
              <p className="text-xs text-black/40">
                {time}
                {me && (
                  <IoCheckmarkDoneSharp className="inline-block mx-1 text-lg text-sky-500" />
                )}
              </p>
            </div>
          ))}
        </section>
  
        <form
          onSubmit={onSubmit}
          className="fixed left-0 bottom-0 bg-red-500/0 p-2 pt-0.5 w-full flex gap-2 items-center group bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]"
        >
          <div className="flex-grow flex items-center gap-3 bg-white border p-2 rounded-full text-black/50">
            <p>
              <GrEmoji className="text-2xl" />
            </p>
            <input
              name="msg"
              className="flex-grow outline-none text-black w-full"
              type="text"
              required
              placeholder="Type a message"
            />
            <p>
              <IoMdAttach className="group-valid:hidden text-2xl" />
            </p>
            <p>
              <FaCamera className="text-2xl" />
            </p>
          </div>
  
          <button type="submit" className="bg-primary p-3 rounded-full">
            <FaMicrophone className="group-valid:hidden text-xl text-white" />
            <IoMdSend className="group-invalid:hidden text-xl text-white" />
          </button>
        </form>
      </main>
    );
  };
  
  const Header = ({ selectedTab, setSelectedTab, setIsCameraOpen }) => {
    const tabs = ["Chats", "Updates", "Calls"];
  
    const [openMenu, setOpenMenu] = useState(false);
  
    const Menu = () => (
      <div
        className="absolute top-12 right-4 rounded-xl text-sm bg-white text-black/90 z-10 flex flex-col gap-4 p-6 shadow-xl border"
        onClick={() => setOpenMenu(false)}
      >
        {[
          "New group",
          "New broadcast",
          "Linked Devices",
          "Starred messages",
          "Payments",
          "Settings"
        ].map((item) => (
          <p>{item}</p>
        ))}
      </div>
    );
  
    return (
      <header className="bg-primary text-white sticky top-0">
        <div className="flex items-center gap-4 p-4 relative">
          <h2 className="text-xl font-normal mr-auto">WhatsApp</h2>
  
          <IoCameraOutline
            className="text-2xl"
            onClick={() => setIsCameraOpen(true)}
          />
          <IoIosSearch className="text-2xl" />
          <HiDotsVertical
            className="text-2xl"
            onClick={() => setOpenMenu((p) => !p)}
          />
  
          {openMenu && <Menu />}
        </div>
  
        <nav className="grid grid-cols-[1fr_2fr_2fr_2fr] text-center">
          <p
            onClick={() => setSelectedTab("community")}
            className={`flex justify-center font-medium py-1.5 border-b-4 hover:bg-black/10 ${
              selectedTab === "community"
                ? "border-white"
                : "border-transparent text-white/70"
            }`}
          >
            <IoIosPeople className="text-2xl" />
          </p>
  
          {tabs.map((tab) => (
            <p
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex justify-center font-medium py-1.5 border-b-4 hover:bg-black/10 ${
                selectedTab === tab
                  ? "border-white"
                  : "border-transparent text-white/70"
              }`}
            >
              {tab}
            </p>
          ))}
        </nav>
      </header>
    );
  };
  
  const CommunityTab = () => {
    return (
      <div className="p-5">
        <section className="text-center">
          <img
            src="https://github.com/devXprite/infoooze/assets/80192140/0e156417-ef42-48e4-9c95-38a10e11a547"
            className="block mx-auto mt-8"
          />
  
          <h2 className="text-xl mt-4 font-medium">
            Stay connected with a community
          </h2>
  
          <p className="text-sm text-black/60 mt-2">
            Communities bring members together in topic-based groups, and make it
            easy to get admin announcements. Any community you're added to will
            appear here.
          </p>
  
          <a href="#" className="text-primary text-sm mt-2">
            See example communities
          </a>
  
          <div>
            <button className="font-medium bg-primary text-white px-8 py-2 mt-8 rounded-full">
              Start Your Community
            </button>
          </div>
        </section>
      </div>
    );
  };
  
  const ChatsTab = ({ chats, setSelectedChat, setIsCalling }) => {
    const [selectedProfile, setSelectedProfile] = useState(false);
  
    return (
      <>
        {selectedProfile && (
          <div
            className=" min-h-screen w-full backdrop-blur-sm bg-black/50 fixed top-0 z-20"
            onClick={() => setSelectedProfile(false)}
          >
            <div
              className="w-3/4 mx-auto mt-[15vh] max-w-screen-sm relative"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2 className="absolute top-0 text-white bg-black/25 w-full p-2">
                {selectedProfile.name}
              </h2>
              <img
                src={selectedProfile.image}
                className="aspect-square object-cover"
              />
              <div className="flex px-4 py-3 justify-between bg-white text-primary text-2xl">
                <MdMessage onClick={() => setSelectedChat(selectedProfile.id)} />
                <MdCall onClick={() => setIsCalling(selectedProfile)} />
                <MdVideocam
                  onClick={() =>
                    setIsCalling({ ...selectedProfile, type: "video" })
                  }
                />
                <MdInfoOutline />
              </div>
            </div>
          </div>
        )}
  
        <section className="">
          {chats.map((chat) => (
            <div
              className="grid grid-cols-[3rem_1fr] items-center gap-3 px-5 py-4 hover:bg-gray-200"
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
            >
              <img
                className="rounded-full bg-gray-800 w-12 h-12 object-cover"
                src={chat.image}
                onClick={(e) => {
                  setSelectedProfile(chat);
                  e.stopPropagation();
                }}
              />
              <div>
                <h4 className="text-gray-800 font-medium text-base flex justify-between">
                  <span>{chat.name}</span>
  
                  <span
                    className={`text-xs ${
                      chat.unread ? "text-green-500" : "text-black/50"
                    }`}
                  >
                    {chat.messages[chat.messages.length - 1].time}
                  </span>
                </h4>
  
                <p className="text-sm text-black/60 flex justify-between">
                  <span className="line-clamp-1  w-[95%]">
                    {chat.messages[chat.messages.length - 1].text}
                  </span>
                  {chat.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs w-5 h-5 rounded-full inline-flex pt-0.5 items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
  
          <div className="fixed bottom-6 right-5 bg-primary p-4 rounded-2xl">
            <MdMessage className="text-2xl text-white" />
          </div>
        </section>
      </>
    );
  };
  
  const UpdatesTab = ({ status, setIsCameraOpen, setSelectedStatus }) => {
    return (
      <div className="px-4 py-2">
        <header>
          <h2 className="text-lg font-medium my-4">Status</h2>
          <div
            className="grid grid-cols-[3.5rem_1fr] items-center gap-3"
            onClick={() => setIsCameraOpen(true)}
          >
            <img
              className="rounded-full bg-gray-600 w-12 h-12"
              src={"https://github.com/devXprite.png"}
            />
            <div>
              <h4 className="text-gray-800 font-medium">My Status</h4>
              <p className="text-sm text-black/50 flex justify-between">
                Tap to add status update
              </p>
            </div>
          </div>
        </header>
        <section className="mt-6">
          <h4 className="text-black/50 font-medium text-sm my-4">
            Recent Updates
          </h4>
  
          <div className="flex flex-col gap-5">
            {status.map((state) => (
              <div
                className="grid grid-cols-[3.25rem_1fr] items-center gap-3"
                key={state.id}
                onClick={() => setSelectedStatus(state)}
              >
                <img
                  className="rounded-full w-[3.25rem] h-[3.25rem] border-2 border-primary-500 p-[1px] object-cover"
                  src={state.image}
                />
                <div>
                  <h4 className="text-gray-800 font-medium">{state.name}</h4>
                  <p className="text-sm text-black/50 flex justify-between ">
                    {state.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <hr className="mt-6" />
  
        <section className="mt-6">
          <h2 className="text-lg font-medium mb-2 flex items-center justify-between">
            <span>Channels</span>
            <IoMdAdd className="text-xl" />
          </h2>
          <p className="text-black/50 text-sm">
            Stay updated on topic that matters to you. Find channels to follow
            below.
          </p>
  
          <button className="mt-6 bg-primary font-medium text-sm text-white py-2  px-5 rounded-full">
            Explore More
          </button>
        </section>
  
        <div
          className="fixed bottom-6 right-5 bg-primary p-4 rounded-2xl"
          onClick={() => setIsCameraOpen(true)}
        >
          <FaCamera className="text-2xl text-white" />
        </div>
      </div>
    );
  };
  
  const CallsTab = ({ callLogs, setIsCalling }) => {
    return (
      <div className=" py-5">
        <header className="grid grid-cols-[3rem_1fr] items-center gap-3 px-5">
          <div className="bg-primary  w-12 h-12 rounded-full flex items-center justify-center">
            <IoLink className="text-2xl text-white" />
          </div>
  
          <div>
            <h2 className="text-base font-medium text-black/80">
              Create call link
            </h2>
            <p className="text-sm text-black/50 font-medium">
              Share a link for your WhatsApp call
            </p>
          </div>
        </header>
  
        <section className="mt-6">
          {callLogs.map((call, i) => (
            <div
              className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-5 gap-3 py-3 hover:bg-gray-200"
              key={i}
            >
              <img
                className="rounded-full bg-gray-800 w-12 h-12 object-cover"
                src={call.image}
              />
  
              <div>
                <p className="text-gray-800 text-base">{call.name}</p>
                <p className={`text-xs text-black/60 w-[95%] line-clamp-1`}>
                  <FaArrowLeft
                    className={`inline mr-1 text-green-600 ${
                      call.outgoing ? "rotate-[135deg]" : "rotate-[315deg]"
                    }`}
                  />
                  {call.time}
                </p>
              </div>
  
              <div
                onClick={() => {
                  setIsCalling(call);
                }}
              >
                {call.type === "video" ? (
                  <FaVideo className="text-lg text-primary" />
                ) : (
                  <FaPhone className="rotate-90 text-lg text-primary" />
                )}
              </div>
            </div>
          ))}
        </section>
  
        <div className="fixed bottom-6 right-5 bg-primary p-4 rounded-2xl">
          <MdCall className="text-2xl text-white" />
        </div>
      </div>
    );
  };
  
  function App() {
    const [chats, setChats] = useState(defaultChats);
    const [callLogs, setCallLogs] = useState(defaultCallLogs);
    const [selectedTab, setSelectedTab] = useState("Chats");
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
  
    if (isCameraOpen) return <CameraPage setIsCameraOpen={setIsCameraOpen} />;
    if (Boolean(selectedStatus))
      return (
        <StatusPage
          status={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      );
    if (Boolean(isCalling))
      return (
        <CallingPage
          setIsCalling={setIsCalling}
          isCalling={isCalling}
          setCallLogs={setCallLogs}
        />
      );
  
    if (Boolean(selectedChat))
      return (
        <ChatPage
          chats={chats}
          selectedChat={selectedChat}
          setChats={setChats}
          setSelectedChat={setSelectedChat}
          setIsCalling={setIsCalling}
        />
      );
  
    return (
      <>
        <Header
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setIsCameraOpen={setIsCameraOpen}
        />
        {selectedTab === "community" && <CommunityTab />}
        {selectedTab === "Chats" && (
          <ChatsTab
            chats={chats}
            setSelectedChat={setSelectedChat}
            setIsCalling={setIsCalling}
          />
        )}
        {selectedTab === "Updates" && (
          <UpdatesTab
            status={status}
            setIsCameraOpen={setIsCameraOpen}
            setSelectedStatus={setSelectedStatus}
          />
        )}
        {selectedTab === "Calls" && (
          <CallsTab callLogs={callLogs} setIsCalling={setIsCalling} />
        )}
      </>
    );
  }
  
  ReactDOM.render(<App />, document.body);
//   https://codepen.io/devXprite/pen/ExMLYdG?editors=0010