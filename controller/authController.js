import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../model/AdminModel.js";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find admin
        const admin = await Admin.findOne({
            where: { email }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // Check account active
        if (!admin.is_active) {
            return res.status(403).json({
                success: false,
                message: "Account is not active. Please contact customer care."
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password does not match"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin.id },
            process.env.JWT_SECRET
        );

        // Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};