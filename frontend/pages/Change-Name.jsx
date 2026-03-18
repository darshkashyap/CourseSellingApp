import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangeName() {
    const [newName, setNewName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newName.trim()) {
            return alert("Please enter a valid name");
        }

       
        localStorage.setItem('firstName', newName);

        alert("Name updated successfully!");

       
        navigate('/profile');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Change Name</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New Name"
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Change Name
                </button>
            </form>
        </div>
    );
}