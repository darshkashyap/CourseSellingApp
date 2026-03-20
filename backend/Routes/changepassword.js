const { Router } = require("express");
const authRouter = Router();

const { adminModel, userModel } = require("../db.js");
const bcrypt = require("bcrypt");
const { changePasswordMiddlware} = require("../middleware/changepassword");

authRouter.put("/change-password", changePasswordMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.userId;
        const role = req.role;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "New password must be different from old password"
            });
        }


        const Model = role === "admin" ? adminModel : userModel;

        const user = await Model.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (err) {
        console.error("Change password error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { authRouter };