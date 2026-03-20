const { JWT_USER_PASSWORD } = require("../config.js");
const jwt = require("jsonwebtoken");

const changePasswordMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        req.userId = decoded.userId;
        req.role = decoded.role; 

        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { changePasswordMiddleware };