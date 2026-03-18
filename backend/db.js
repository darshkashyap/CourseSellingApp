const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const ObjectID= mongoose.Types.ObjectId;

console.log("Connected to MongoDB");

const userSchema= Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  });

const courseSchema= Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageLink: {type: String, required: true},
        published: {type: Boolean, required: true},
        creatorID:ObjectID,
});

const adminSchema= Schema({ email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}, });

const purchaseSchema= Schema({ 
    userID: ObjectID,
    courseID: ObjectID,
 });

const userModel= mongoose.model("User", userSchema);
const courseModel= mongoose.model("Course", courseSchema);
const adminModel= mongoose.model("Admin", adminSchema);
const purchaseModel= mongoose.model("Purchase", purchaseSchema);

module.exports= {userModel, courseModel, adminModel, purchaseModel};