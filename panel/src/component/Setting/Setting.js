import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutFunction } from '../../utils/APICalling';


function Settings() {
    const [theme, setTheme] = useState('light');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    const handleSaveProfile = () => {
        setShowProfileModal(false);
    };

    const navigate = useNavigate()
    return (
        <div className={`h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="w-[20%] bg-[#075e54] text-white p-4">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Settings</h1>
                </div>
                <div className='!flex !flex-col justify-center gap-5'>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]" onClick={() => setShowProfileModal(true)}>
                        Profile
                    </p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e] ">Privacy</p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]">Notifications</p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]">Theme</p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]" onClick={() => navigate('/dashboard')}>Chat</p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]">Help</p>
                    <p className="p-2 cursor-pointer hover:bg-[#128c7e] hover:text-white rounded-lg bg-white text-[#128c7e]" onClick={() => logOutFunction()}>Logout</p>
                </div>

            </div>

            <div className="flex-1 p-6">
                <div className="space-y-6">
                    {/* Profile Section */}
                    {showProfileModal && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Name</label>
                                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="Your Name" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Status</label>
                                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="Your Status" />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setShowProfileModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button className="bg-[#075e54] text-white px-4 py-2 rounded-lg" onClick={handleSaveProfile}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Section */}
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Privacy</h2>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span>Last Seen</span>
                                <select className="p-2 border rounded-lg">
                                    <option>Everyone</option>
                                    <option>My Contacts</option>
                                    <option>Nobody</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-4">
                                <span>Profile Photo</span>
                                <select className="p-2 border rounded-lg">
                                    <option>Everyone</option>
                                    <option>My Contacts</option>
                                    <option>Nobody</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Notifications</h2>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span>Message Notifications</span>
                                <input type="checkbox" className="w-6 h-6" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <span>Group Notifications</span>
                                <input type="checkbox" className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Theme Section */}
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Theme</h2>
                        <div className="mt-4">
                            <button
                                onClick={toggleTheme}
                                className="bg-[#075e54] text-white p-2 rounded-lg"
                            >
                                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                            </button>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Help</h2>
                        <p className="mt-4 text-sm text-gray-600">Find more information about WhatsApp settings and troubleshooting here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;


