//INITIALIZATION
const { Router } = require('express');
const userRouter = Router();
const jwt=require("jsonwebtoken");
const { userModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config.js");
const { userMiddleware } = require('../middleware/user.js');
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
userRouter.post("/signup",async function(req, res){
const { firstName,lastName, email, password } = req.body;

const validationResult = signupSchema.safeParse({ firstName, lastName, email, password });//Zod Schema Validation for the input data

if (!validationResult.success) {
    return res.status(400).json({ message: "Invalid input data", errors: validationResult.error.issues });
}
const hashedPassword = await bcrypt.hash(password, 10);//Hashing the password before storing it in the database for security reasons
await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
});

res.status(201).json({message: "User created successfully"});

});

//2. SIGNIN
userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;
    
    const validationResult = signinSchema.safeParse({ email, password });//Zod Schema Validation for the input data

    if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid input data", errors: validationResult.error.issues });
    }

    const user = await userModel.findOne({ email: email });
    if(user) {
        const isMatch = await bcrypt.compare(password, user.password);//Comparing the provided password with the hashed password stored in the database for authentication
        if(isMatch) {
            const token = jwt.sign({id:user._id}, JWT_USER_PASSWORD, { expiresIn: "1h" });
            res.json({message: "User signed in successfully", token: token,firstName: user.firstName, lastName: user.lastName, email: user.email});
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } else {
        res.status(401).json({message: "Invalid email or password"});
    }
});

//3. GET PURCHASES
userRouter.get("/purchases", userMiddleware,async function(req, res){
const userId = req.userId;
const purchases = await purchaseModel.find({userId: userId});
res.status(200).json({message: "Purchases retrieved successfully", purchases: purchases});
});
//4.CHANGE PASSWORD
userRouter.post("/change-password", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid old password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
});

//EXPORTS
module.exports = {userRouter: userRouter};      