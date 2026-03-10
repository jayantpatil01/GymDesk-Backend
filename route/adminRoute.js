import express from "express";
import { getLoggedInAdmin } from "../controller/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// The flow: Request -> verifyToken (sets req.adminId) -> getLoggedInAdmin
router.get("/me", verifyToken, getLoggedInAdmin);

export default router;