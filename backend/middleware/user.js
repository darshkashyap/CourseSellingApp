const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config.js");

function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        req.userId = decoded.id;

        next();

    } catch (err) {
        console.error(err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please login again" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { userMiddleware }