const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db.js");

adminRouter.post("/signup", (req, res) => {

});

adminRouter.post("/signin", (req, res) => {

});

adminRouter.post("/courses", (req, res) => {

});

adminRouter.get("/courses/bulk", (req, res) => { 

});

adminRouter.put("/courses", (req, res) => {

});

module.exports = {adminRouter: adminRouter};