//User will be able to view all the courses that he/she has purchased in a separate page.
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const fetchMyCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                "http://localhost:3000/user/purchases",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourses(res.data.courses);
        } catch (error) { console.error("Error fetching my courses:", error); }
    };
    useEffect(() => {
        fetchMyCourses();
    }, []);
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">My Courses</h2>
            {courses.length === 0 ? (
                <p>You haven't purchased any courses yet.</p>
            ) : (
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div key={course._id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <p>{course.description}</p>
                            <p className="text-lg font-bold">Price: ₹{course.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}