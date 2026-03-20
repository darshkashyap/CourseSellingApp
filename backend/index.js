require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const { adminRouter } = require("./Routes/admin.js");
const { courseRouter } = require("./Routes/course.js");
const { userRouter } = require("./Routes/user.js");
const { authRouter } = require("./Routes/auth.js"); 

app.use(cors({
    origin: "http://localhost:5173"
}));

// Routes
app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter); 

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

main().catch((err) => console.log(err));