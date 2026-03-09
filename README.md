# Course Selling App Backend

Overview

This project is a basic backend skeleton for a course platform built using Node.js, Express, and MongoDB.
It provides the initial backend structure including route setup, database schema, and MongoDB connection, but does not yet include full business logic or complete API implementations.

The project is intended as a starting point for building a full backend for a course selling or learning platform.

Features

Express server setup

Basic route structure for:

Admin

User

Courses

MongoDB database connection

Basic database schema definitions

JSON request handling middleware

Organized route files

Project Structure
project
│
├── server.js          # Main Express server
├── db.js              # MongoDB connection and schema definitions
│
└── Routes
    ├── admin.js       # Admin related routes
    ├── user.js        # User related routes
    └── course.js      # Course related routes
Current Status

⚠️ Important:
This repository currently contains only skeleton routes and database schemas.

The following features are not fully implemented yet:

Authentication logic

Course creation logic

User enrollment

Validation and error handling

Authorization (JWT / middleware)

These routes currently act as placeholders for future implementation.

Tech Stack

Node.js

Express.js

MongoDB

Mongoose

Installation

Clone the repository:

git clone https://github.com/yourusername/project-name.git

Install dependencies:

npm install
Run the Server
node server.js

The server will run on:

http://localhost:3000
Available Routes (Skeleton)
Admin Routes
POST /admin/signup
POST /admin/signin
POST /admin/courses
GET  /admin/courses/bulk
PUT  /admin/courses
User Routes
POST /user/signup
POST /user/signin
GET  /user/courses
Course Routes
GET /course/preview
Future Improvements

JWT authentication

Course purchase system

Middleware for admin/user authorization

Input validation

Proper controllers and services architecture

API documentation

Purpose

This repository is meant to serve as a base structure for learning backend development with Express and MongoDB. It helps establish a clear project layout before implementing complete application logic.