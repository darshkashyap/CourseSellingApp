const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { adminRouter } = require("./Routes/admin.js");
const { courseRouter } = require("./Routes/course.js");
const { userRouter } = require("./Routes/user.js");

app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);


async function main() {
await mongoose.connect("mongodb+srv://dkdarshkashyap07:darshisbest@cluster0.vwkctu4.mongodb.net/");
app.listen(3000, () => { console.log('Server is running on port 3000');});
}

main().catch((err) => console.log(err));