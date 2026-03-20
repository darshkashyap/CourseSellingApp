import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        const storedName = localStorage.getItem('firstName');
        const storedRole = localStorage.getItem('role');
        if (storedName) setName(storedName);
        if (storedRole) setRole(storedRole);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("firstName");
        navigate("/signin");
    };
    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Profile
            </h2>
            <div className="mb-6 text-center">
                <p className="text-lg text-gray-600">
                    Hello <span className="font-semibold text-gray-900">{name || "User"}</span> 👋
                </p>
                <div className="mt-3 inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                    Role: {role || "N/A"}
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <button onClick={() => navigate('/change-name')} className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition text-white py-2.5 rounded-lg shadow-md"
                >      Change Name
                </button>
                <button onClick={() => navigate('/change-password')} className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white py-2.5 rounded-lg shadow-md"
                >  Change Password
                </button>
                <button onClick={() => navigate('/user/purchases')}className="w-full bg-purple-500 hover:bg-purple-600 active:scale-95 transition text-white py-2.5 rounded-lg shadow-md"
                >    View My Courses
                </button>
                <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 active:scale-95 transition text-white py-2.5 rounded-lg shadow-md"
                > Logout
                </button>
            </div>
        </div>
    );
}