import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            return alert("Please fill all fields");
        }

        if (newPassword.length < 6) {
            return alert("New password must be at least 6 characters");
        }

       
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);

        alert("Password updated successfully (backend pending)");

       
        setOldPassword('');
        setNewPassword('');

      
        navigate('/profile');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            
            <button
                type="button"
                onClick={() => navigate('/profile')}
                className="mb-4 text-sm text-gray-500 hover:underline"
            >
                ← Back to Profile
            </button>

            <h2 className="text-xl font-bold mb-4">Change Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 mb-3"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}