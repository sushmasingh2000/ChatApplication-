import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { endpoint } from "../utils/APIRoutes";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import empty from "../images/empty.png"

function UserList({ setSelectedUser }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const user_id = localStorage.getItem("ID")
  const { data } = useQuery(["user"], async () => {
      try {
        const response = await axios.get(`${endpoint?.contact_list}?userId=${user_id}`);
        return response.data;
      } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Error fetching data');
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const Usersdata = data?.data || [];
  const filteredUsers = Usersdata.filter((item) =>
    item?.username.toLowerCase().includes(search.toLowerCase()) 
  );
  return (
    <div className=" bg-[#E5DDD5] p-4 h-screen lg:h-full">
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
            {filteredUsers?.length === 0 ? (
             <p className="text-black !font-bold text-center pt-7"> <img src={empty} alt=""/></p>) 
             : (filteredUsers.map((item) => (
               <div
                key={item?.id}
                className="flex items-center p-2 cursor-pointer rounded-lg bg-white text-black"
                onClick={() => setSelectedUser(item)} >
              <img src={"https://randomuser.me/api/portraits/lego/2.jpg"}
                alt="Not found" className="h-12 w-12 rounded-full border-2 border-[#075e54]" />
              <p className="ml-4 text-[#075e54] text-lg">{item?.username}</p>
            </div>
          ))
          )}
         </div>
      {/* <button  className="absolute bottom-5  left-48 transform -translate-x-1/2 bg-[#075e54]  text-white
       py-2 px-6 " onClick={() => navigate('/contact')}> + Add to Contacts </button> */}
    </div>
  );
}
export default UserList;