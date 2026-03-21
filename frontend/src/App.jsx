import { useState } from 'react'
import './App.css'
import './index.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/HomePage';
import Profile from '../pages/Profile';
import ChangeName from '../pages/Change-Name';
import ChangePassword from '../pages/PasswordEdit';
import Courses from '../pages/Courses';
import AllUsers from '../pages/admins/AllUsers';
import CreateCourse from '../pages/admins/CreateCourse';
import MyCourses from '../pages/MyCourses';
import PurchaseCourse from '../pages/PurchaseCourse';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-name" element={<ChangeName />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/course/preview" element={<Courses />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route path="/user/purchases" element={<MyCourses />} />
          <Route path="/course/purchase/:courseId" element={<PurchaseCourse />} />
         <Route path="*" element={<h2 className="text-2xl font-bold">404 - Page Not Found</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
