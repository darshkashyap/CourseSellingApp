// INITIALIZATION
const { Router } = require('express');
const adminRouter = Router();

const { adminModel, courseModel, userModel } = require("../db.js"); 
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");
const { adminMiddleware } = require('../middleware/admin.js');
const zod = require("zod");
const bcrypt = require("bcrypt");

// ZOD SCHEMAS
const signupSchema = zod.object({
    firstName: zod.string().min(2).max(100),
    lastName: zod.string().min(2).max(100),
    email: zod.string().email(),
    password: zod.string().min(6)
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});


// 1. SIGNUP
adminRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const validationResult = signupSchema.safeParse({ firstName, lastName, email, password });

        if (!validationResult.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validationResult.error.issues
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({ message: "Admin created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// 2. SIGNIN
adminRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const validationResult = signinSchema.safeParse({ email, password });

        if (!validationResult.success) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

       
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            JWT_ADMIN_PASSWORD,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Admin signed in successfully",
            token,
            role: "admin"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// 3. CREATE COURSE
adminRouter.post("/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { title, description, price, imageLink, published } = req.body;

        const course = await courseModel.create({
            title,
            description,
            price,
            imageLink,
            published,
            creatorID: adminId,
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// 4. GET ALL COURSES CREATED BY ADMIN
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;

        const courses = await courseModel.find({
            creatorID: adminId
        });

        res.status(200).json({
            message: "Courses fetched successfully",
            courses
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// 5. UPDATE COURSE
adminRouter.put("/update-course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { courseId, title, description, price, imageLink, published } = req.body;

        const course = await courseModel.findOneAndUpdate(
            { _id: courseId, creatorID: adminId },
            { title, description, price, imageLink, published },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



// 6. GET ALL USERS
adminRouter.get("/users", adminMiddleware, async (req, res) => {
    try {
        const users = await userModel.find({});

        res.status(200).json({
            message: "Users retrieved successfully",
            users
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// 7. DELETE COURSE
adminRouter.delete("/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { courseId } = req.body;

        const course = await courseModel.findOneAndDelete({
            _id: courseId,
            creatorID: adminId
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// EXPORT
module.exports = { adminRouter };