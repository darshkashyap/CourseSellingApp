import {React,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] =useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
const handlesubmit = async (e) => {
    e.preventDefault();
    if(!form.firstName && !form.lastName && !form.email && !form.password){
        alert('Please fill all the fields');
        return;
    }
    try {
        const res= await axios.post('http://localhost:3000/user/signup', form);
        navigate('/signin');
    } catch (err) {
        console.error('Error signing up:', err);
        alert('Error signing up. Please try again.');
    }
}
return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handlesubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={form.firstname}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />  
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={form.lastname}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input  
                    type="email"
                    className="w-full px-3 py-2 border rounded"
                    value={form.email}  
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Sign Up
            </button>
        </form>
    </div>
);
}
