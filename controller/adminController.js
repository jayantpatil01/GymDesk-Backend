import Admin from "../model/AdminModel.js";

export const getLoggedInAdmin = async (req, res) => {
    try {
        // req.adminId comes directly from your verifyToken middleware
        const admin = await Admin.findByPk(req.adminId, {
            attributes: { exclude: ["password"] } // Never send the password back
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        console.error("Error retrieving logged-in admin:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};