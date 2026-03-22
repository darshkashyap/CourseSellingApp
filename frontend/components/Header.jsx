import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        localStorage.removeItem("firstName");
        navigate("/signin");
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">  EduPlatform</Link>
            <nav className="flex gap-6 text-lg font-medium items-center">
                <Link to="/course/preview" className="hover:text-gray-400">
                    Courses
                </Link>

                {token && role === "admin" && (
                    <>
                        <Link to="/admin/users" className="hover:text-gray-400">
                            All Users
                        </Link>
                        <Link to="/admin/create-course" className="hover:text-gray-400">
                            Create Course
                        </Link>
                    </>
                )}

                {token && role === "user" && (
                    <>
                        <Link to="/user/purchases" className="hover:text-gray-400">
                            My Courses
                        </Link>
                    </>
                )}

                {token && (
                    <Link to="/profile" className="hover:text-gray-400">
                        Profile
                    </Link>
                )}

                {!token ? (
                    <>
                        <Link to="/signin" className="hover:text-gray-400">
                            Sign In
                        </Link>
                        <Link to="/signup" className="hover:text-gray-400">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="hover:text-gray-400"
                    >
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
}