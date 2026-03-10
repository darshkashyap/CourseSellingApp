const { JWT_ADMIN_PASSWORD } = require("../config.js");
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;  
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    if (decoded) {
        req.adminId  = decoded.id;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { adminMiddleware: adminMiddleware };