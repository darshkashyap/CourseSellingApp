const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db.js");
const jwt=require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");
adminRouter.post("/signup", async function(req, res){
const {email, password,firstName,lastName} = req.body;
await adminModel.create({
    email,
    password,
    firstName,  
    lastName,
});
res.status(201).json({message: "Admin created successfully"});

});

adminRouter.post("/signin", async function(req, res) {
  const { email, password } = req.body;
    const user = await adminModel.findOne({ email: email, password: password });
    if(user) {
       const token = jwt.sign({id:user._id}, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });
         res.json({message: "Admin signed in successfully", token: token});
    } else {
        res.status(401).json({message: "Invalid email or password"});
    }
});

adminRouter.post("/courses", (req, res) => {

});

adminRouter.get("/courses/bulk", (req, res) => { 

});

adminRouter.put("/courses", (req, res) => {

});

module.exports = {adminRouter: adminRouter};