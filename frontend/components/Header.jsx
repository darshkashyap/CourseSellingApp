import React from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Coursera</h1>
      
            <nav className="flex gap-6 text-lg font-medium">
                <Link to="/courses" className="hover:text-gray-400">Courses</Link>
                {token ? (
                    <><button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                      <Link to="/profile" className="hover:text-gray-400">Profile</Link>
                      </>
                    
                ) : (
                    <>
                        <Link to="/signin" className="hover:text-gray-400">Sign In</Link>
                        <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
                            
                    </>
                    
                )}
            </nav>
        </header>

    );
}