import {useEffect,useState} from 'react';
import axios from 'axios';
export default function Courses() {
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/course');
            setCourses(res.data);
        } catch (err) {
            console.error('Error fetching courses:', err);
            alert('Error fetching courses. Please try again.');
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
            {courses.length === 0 ? (
                <p>No courses available at the moment.</p>
            ) : (   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="border rounded p-4">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-gray-700 mb-4">{course.description}</p>
                            <p className="text-lg font-bold">${course.price}</p>
                             <p className="mt-4 text-sm text-gray-500 italic">Author: {course.author}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
