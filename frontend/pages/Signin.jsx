import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); 

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/user/signin', form);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('firstName', res.data.firstName);

            navigate('/courses');
        } catch (err) {
            console.error('Error signing in:', err);
            alert('Error signing in. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>

            <form onSubmit={handlesubmit}>
               
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>    
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

               
                <div className="mb-4 relative">
                    <label className="block text-gray-700">Password</label>

                    <input
                        type={showPassword ? "text" : "password"} 
                        className="w-full px-3 py-2 border rounded pr-16"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-sm text-blue-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}