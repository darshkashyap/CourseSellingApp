import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const role = localStorage.getItem("role");


                if (role !== "admin") {
                    alert("Access denied");
                    return navigate("/");
                }

                const res = await axios.get(
                    "http://localhost:3000/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUsers(res.data.users);

            } catch (err) {
                console.error(err);

                if (err.response?.status === 401) {
                    alert("Session expired, please login again");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/signin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    if (loading) {
        return <div className="text-center mt-10">Loading users...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">All Users</h2>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <div className="space-y-4">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="p-4 border rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}