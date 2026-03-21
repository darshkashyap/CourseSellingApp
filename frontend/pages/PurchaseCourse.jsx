import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PurchaseCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:3000/course/purchase",
                { courseId },
                {  headers: { Authorization: `Bearer ${token}` }}
            );
            alert("Course purchased successfully!");
            navigate("/courses/preview"); 
        } catch (error) {
            console.error("Error purchasing course:", error);
            if (error.response?.status === 401) {  alert("Please login again");  localStorage.removeItem("token");
                navigate("/signin");
                return;
            }
            alert(error.response?.data?.message || "Failed to purchase course");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Purchase Course</h2>
            <p>Are you sure you want to purchase this course?</p>
              <button  onClick={handlePurchase} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
                Purchase Course
            </button>
        </div>
    );
}