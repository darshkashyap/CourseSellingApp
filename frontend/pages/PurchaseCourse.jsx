//User will be able to purchase a course 
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function PurchaseCourse() {
    const { courseId } = useParams();
    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/course/purchase/${courseId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Course purchased successfully!");
        } catch (error) {
            console.error("Error purchasing course:", error);
            alert("Failed to purchase course. Please try again.");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Purchase Course</h2>
            <p>Are you sure you want to purchase this course?</p>
            <button
                onClick={handlePurchase}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Purchase Course
            </button>
        </div>
    );
}
