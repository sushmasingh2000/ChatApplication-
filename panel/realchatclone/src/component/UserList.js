import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { endpoint } from "../utils/APIRoutes";
import axios from "axios";
import { useQuery } from "react-query";


function UserList({ setSelectedUser, selectedUser }) {
  const [search, setSearch] = useState("");

  const {  data } = useQuery(
    ["user_list"],
    async () => {
      const response = await axios.get(endpoint?.userlist_api);
      return response.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const Users = data?.list || []
  
  return (
    <div className="h-full bg-[#E5DDD5] p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-[#075e54] text-white outline-none placeholder-white placeholder-opacity-80 rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
      </div>
      <div className="space-y-2 max-h-[calc(100vh-160px)] overflow-hidden hover:overflow-y-auto">
        {Users?.map((item) => (
          <div
            key={item?.id}
            className={`flex items-center p-2 cursor-pointer rounded-lg ${item?.id === selectedUser?.id ? "bg-green-500 text-white" : "bg-white text-black"}`}
            onClick={() => setSelectedUser(item)}
          >
            <img
              src={item?.img}
              alt="Not found"
              className="h-12 w-12 rounded-full border-2 border-[#075e54]"
            />
            <p className="ml-4 text-[#075e54] text-lg">{item?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
