import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import { IoIosArrowUp, IoMdAdd } from 'react-icons/io';

const Status = () => {
  const [progress, setProgress] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [status, setStatus] = useState({
    image: 'https://github.com/devXprite.png',
    name: 'User Name',
    time: '10:30 AM',
    status: 'https://example.com/status-image.jpg'
  });

  // Sample data for recent status updates
  const recentStatuses = [
    {
      id: 1,
      image: 'https://github.com/devXprite.png',
      name: 'User 1',
      time: '10:30 AM',
      status: 'https://example.com/status-image1.jpg'
    },
    {
      id: 2,
      image: 'https://github.com/devXprite.png',
      name: 'User 2',
      time: '11:00 AM',
      status: 'https://example.com/status-image2.jpg'
    },
    {
      id: 3,
      image: 'https://github.com/devXprite.png',
      name: 'User 3',
      time: '12:00 PM',
      status: 'https://example.com/status-image3.jpg'
    },
  ];

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
  }, [selectedStatus]);

  return (
    <div className="px-4 py-2 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Status</h2>
        <div
          className="grid grid-cols-[3.5rem_1fr] items-center gap-3 mt-4 cursor-pointer"
          onClick={() => setIsCameraOpen(true)}
        >
          <img
            className="rounded-full bg-gray-600 w-14 h-14 shadow-md"
            src={status.image}
            alt="status-avatar"
          />
          <div>
            <h4 className="text-gray-800 font-semibold text-lg">My Status</h4>
            <p className="text-sm text-gray-600 flex justify-between">Tap to add status update</p>
          </div>
        </div>
      </header>

      {/* Show Recent Updates */}
      <section className="mt-6">
        <h4 className="text-gray-600 font-medium text-sm my-4">Recent Updates</h4>
        <div className="flex flex-col gap-4">
          {recentStatuses.map((recentStatus) => (
            <div
              key={recentStatus.id}
              className="grid grid-cols-[3.5rem_1fr] items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition ease-in-out"
              onClick={() => setSelectedStatus(recentStatus)}
            >
              <img
                className="rounded-full bg-gray-600 w-12 h-12 object-cover shadow-md"
                src={recentStatus.image}
                alt="status-avatar"
              />
              <div>
                <h4 className="text-gray-800 font-medium">{recentStatus.name}</h4>
                <p className="text-sm text-gray-500">{recentStatus.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mt-6" />

      {/* Display the full status if selected */}
      {selectedStatus && (
        <section className="bg-black text-white min-h-screen flex items-center justify-center relative">
          <div
            className="absolute top-0 left-0 bg-white/75 rounded-full h-1 transition-all ease-linear z-50"
            style={{ width: `${progress}%` }}
          ></div>

          <div className="flex gap-3 items-center py-3 px-4 top-0 fixed left-0 w-full bg-black/60 backdrop-blur-md shadow-lg">
            <FaArrowLeft className="text-2xl text-white" onClick={() => setSelectedStatus(null)} />

            <div className="grid grid-cols-[2.75rem_1fr] items-center gap-3">
              <img
                className="rounded-full bg-gray-600 w-14 h-14 object-cover shadow-md"
                src={selectedStatus.image}
                alt="status-avatar"
              />
              <div>
                <h4 className="text-lg font-semibold">{selectedStatus.name}</h4>
                <p className="text-sm text-white/70">{selectedStatus.time}</p>
              </div>
            </div>
          </div>

          <img
            src={selectedStatus.status}
            className="block w-full object-cover max-h-[80vh] rounded-lg shadow-xl"
            alt="status-image"
          />

          <div className="fixed bg-black/60 text-white/90 w-full bottom-0 left-0 py-6 text-center backdrop-blur-md">
            <IoIosArrowUp className="text-3xl mx-auto animate-bounce" />
            <p className="text-sm">Reply</p>
          </div>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-lg font-medium mb-2 flex items-center justify-between">
          <span>Channels</span>
          <IoMdAdd className="text-2xl text-primary" />
        </h2>
        <p className="text-gray-600 text-sm">
          Stay updated on topics that matter to you. Find channels to follow below.
        </p>

        <button className="mt-6 bg-primary font-semibold text-sm text-white py-2 px-5 rounded-full hover:bg-primary-dark transition">
          Explore More
        </button>
      </section>

      <div
        className="fixed bottom-6 right-6 bg-primary p-4 rounded-2xl shadow-lg hover:bg-primary-dark transition cursor-pointer"
        onClick={() => setIsCameraOpen(true)}
      >
        <FaCamera className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default Status;
