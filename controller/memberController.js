import Member from '../model/MemberModel.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createMember = async (req, res) => {
    try {
        // 1. Get Admin ID from Auth Middleware
        const adminId = req.adminId; 

        // 2. Destructure fields from req.body
        // Note: Multer handles the parsing of text fields when using form-data
        const { 
            fullName, 
            email, 
            mobile, 
            dob, 
            gender, 
            address, 
            emergencyName, 
            emergencyPhone 
        } = req.body;

        // 3. Validation check
        if (!fullName || !email || !mobile || !adminId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: Name, Email, or Mobile."
            });
        }

        // 4. Handle File Data
        // req.file is populated by the 'upload.single' middleware in your route
        const aadharImage = req.file ? req.file.filename : null;

        // 5. Create record in MySQL via Sequelize
        const newMember = await Member.create({
            adminId,
            fullname: fullName, 
            email,
            mobile,
            dob,
            gender,
            address,
            emergency_name: emergencyName,
            emergency_phone: emergencyPhone,
            aadhar_image: aadharImage // Now saving the actual filename
        });

        // 6. Send Success Response
        res.status(201).json({
            success: true,
            message: 'Member registered successfully',
            member: newMember
        });

    } catch (error) {
        // Handle Sequelize Unique Constraint (e.g., Duplicate Email)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'This email is already registered.'
            });
        }

        console.error("Member Creation Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export const getMembers = async (req, res) => {
    try {
        const adminId = req.adminId; // Get Admin ID from Auth Middleware
        const members = await Member.findAll({ where: { adminId } });
        res.status(200).json({
            success: true,
            members
        });
    }
    catch (error) {
        console.error("Get Members Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export const getMemberById = async (req, res) => {
    try {
        const adminId = req.adminId; // Get Admin ID from Auth Middleware
        const memberId = req.params.id; // Get Member ID from URL params
        const member = await Member.findOne({ where: { id: memberId, adminId } });
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }
        res.status(200).json({
            success: true,
            member

        });
    }    catch (error) {
        console.error("Get Member By ID Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const adminId = req.adminId;
        const memberId = req.params.id;

        // 1. Find the member first to get the image filename
        const member = await Member.findOne({ where: { id: memberId, adminId } });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        const imageFileName = member.aadhar_image;

        // 2. Delete the database record
        await member.destroy();

        // 3. Delete the physical file if it exists
        if (imageFileName) {
            // Using process.cwd() ensures we start from the project root folder
            const filePath = path.join(process.cwd(), "uploads", "aadhar", imageFileName);

            // Check if file exists before trying to delete
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting physical file:", err);
                    } else {
                        console.log(`Successfully deleted image from disk: ${imageFileName}`);
                    }
                });
            } else {
                console.warn(`File not found at ${filePath}, skipping disk deletion.`);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Member deleted successfully'
        });

    } catch (error) {
        console.error("Delete Member Error:", error);
        res.status(500).json({  
            success: false,
            message: 'Internal Server Error',   
            error: error.message    
        }); 
    }
};