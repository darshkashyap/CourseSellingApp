import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function CreateCourse() {
    const navigate = useNavigate();
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const price = parseFloat(e.target.price.value);
        const author = e.target.author.value;
        if (!title || !description || isNaN(price) || !author) {
            return alert("Please fill in all fields correctly");
        }
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            if (role !== "admin") {
                alert("Access denied");
                return navigate("/");
            }
            await axios.post(
                "http://localhost:3000/admin/course",
                { title, description, price, author },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Course created successfully!");
            navigate("/admin/courses");
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                alert("Session expired, please login again");
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/signin");
            } else {
                alert("Error creating course. Please try again.");
            }
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleCreateCourse}>
                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"  
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />
                <textarea
                    name="description"
                    placeholder="Course Description"
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Course Price"
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    className="shadow border rounded w-full py-2 px-3 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
}