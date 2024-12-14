import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery, useQueryClient } from "react-query";

function AddContact() {
    const navigate = useNavigate();
    const userid = localStorage.getItem("ID");
    const client = useQueryClient()
    
    const initialValues = {
        username: "", 
        userId: "",
    };

    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

        onSubmit: async () => {
            const reqbody = {
                userid: userid,
                t_id: fk.values.userId, 
                username: fk.values.username  
            };
            await AddContactFn(reqbody);
        }
    });

    const AddContactFn = async (reqbody) => {
        try {
            const response = await axios.post(endpoint?.addcontact, reqbody);
            toast(response?.data?.msg);
            if (response?.data?.msg === "Contact added successfully") {
                fk.handleReset();
                navigate('/dashboard');
                client.refetchQueries('user')
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { data } = useQuery(
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
    const Users = data?.data || [];

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg p-8 bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#25D366]">
                <h2 className="text-2xl font-bold text-center text-[#25D366] mb-6">Add Contact</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-black">
                        Select Name
                    </label>
                    <select
                        id="username"
                        value={fk.values.username}
                        onChange={(e) => {
                            const selectedUser = Users.find(user => user.username === e.target.value);
                            fk.setFieldValue("username", selectedUser.username);  // Update the username
                            fk.setFieldValue("userId", selectedUser.id);  // Update the userId
                        }}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    >
                        <option value="" disabled>Select a username</option>
                        {Users?.map((item) => (
                            <option key={item?.id} value={item?.username}>{item?.username}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => fk.handleSubmit()}
                    className="w-full py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E]"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddContact;
