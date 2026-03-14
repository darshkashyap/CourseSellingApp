//INITIALIZATION 
const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db.js");
const jwt=require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");
const { adminMiddleware } = require('../middleware/admin.js');
const zod = require("zod");
const bcrypt = require("bcrypt");
//ZOD SCHEMAS
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
//ROUTES
//1. SIGNUP
adminRouter.post("/signup", async function(req, res){
const {email, password,firstName,lastName} = req.body;
const validationResult = signupSchema.safeParse({ firstName, lastName, email, password });//ZOD VALIDATION 

if (!validationResult.success) {
    return res.status(400).json({ message: "Invalid input data", errors: validationResult.error.issues });
}
const hashedPassword = await bcrypt.hash(password, 10);//HASHING THE PASSWORD BEFORE STORING IT IN THE DATABASE FOR SECURITY REASONS
await adminModel.create({
    email,
    password: hashedPassword,
    firstName,  
    lastName,
});
res.status(201).json({message: "Admin created successfully"});

});
//2. SIGNIN
adminRouter.post("/signin", async function(req, res) {
  const { email, password } = req.body;
    const validationResult = signinSchema.safeParse({ email, password });
    if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid input data", errors: validationResult.error.issues });//ZOD VALIDATION  
    }
    const user = await adminModel.findOne({ email: email }); 
    if(user) {
        const isMatch = await bcrypt.compare(password, user.password);//Comparing the provided password with the hashed password stored in the database for authentication
        if(isMatch) {
            const token = jwt.sign({id:user._id}, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });
            res.json({message: "Admin signed in successfully", token: token});
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } 
});
//3. CREATE COURSE
adminRouter.post("/course",adminMiddleware, async function(req, res){
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
res.status(201).json({message: "Course created successfully", courseID: course._id});
});
//4. GET ALL COURSES CREATED BY THE ADMIN
adminRouter.get("/course/bulk",adminMiddleware,async function(req, res)  { 
    const adminId = req.adminId;
const course = await courseModel.findOne({
   creatorID: adminId
});
res.status(201).json({message: "Course updated successfully", courses : course});
});
//5. UPDATE COURSE
adminRouter.put("/course",adminMiddleware,async function(req, res)  {
const adminId = req.adminId;
const { title, description, price, imageLink, published } = req.body;
const course = await courseModel.updateOne({
    _id:courseId,creatorID: adminId
}, {
    title,
    description,
    price,
    imageLink,
    published,
});
res.status(201).json({message: "Course updated successfully", courseID: course._id});
});
//6.CHANGE PASSWORD
adminRouter.post("/change-password", adminMiddleware, async function(req, res) {
    const adminId = req.adminId;
    const { oldPassword, newPassword } = req.body;
    const admin = await adminModel.findById(adminId);
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid old password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();
    res.status(200).json({ message: "Password changed successfully" });
});
//7. GET ALL USERS
adminRouter.get("/users", adminMiddleware, async function(req, res) {
    const users = await userModel.find({});
    res.status(200).json({ message: "Users retrieved successfully", users: users });
});
//8. DELETE COURSE
adminRouter.delete("/course", adminMiddleware, async function(req, res) {
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
});

//EXPORTS
module.exports = {adminRouter: adminRouter}