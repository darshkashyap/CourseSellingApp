import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('firstName');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            <p className="mb-6">
                Hello <span className="font-semibold">{name || "User"}</span>!
            </p>

            <div className="flex flex-col gap-4">
               
                <button
                    onClick={() => navigate('/change-name')}
                    className="bg-green-500 hover:bg-green-700 text-white py-2 rounded"
                >
                    Change Name
                </button>

              
                <button
                    onClick={() => navigate('/change-password')}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}