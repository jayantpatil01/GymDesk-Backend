import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    // 1. Get token from the header (usually "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied: No Token Provided"
        });
    }

    try {
        // 2. Verify token using your secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Add the admin ID to the request object so controllers can use it
        req.adminId = verified.id;
        
        // 4. Move to the next function (the controller)
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
};