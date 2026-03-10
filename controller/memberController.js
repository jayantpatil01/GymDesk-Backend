import Member from '../model/MemberModel.js';

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