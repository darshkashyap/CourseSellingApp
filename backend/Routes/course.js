const { Router } = require('express');  
const courseRouter = Router();
const { userMiddleware } = require('../middleware/user.js');
const { purchaseModel, courseModel } = require("../db.js");

courseRouter.get("/preview", async function(req, res) {
    const courses = await courseModel.find({published: true});
    res.status(200).json({message: "Courses retrieved successfully", courses: courses});

});

courseRouter.get("/purchase", userMiddleware,async function(req, res) {
const userId= req.userId;
const courseId = req.body.courseId;
await purchaseModel.create({
    userId,
    courseId,
});
res.status(201).json({message: "Course purchased successfully"});
});

module.exports = {courseRouter: courseRouter};

