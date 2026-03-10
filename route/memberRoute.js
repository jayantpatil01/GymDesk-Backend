import express from 'express';
import {createMember} from '../controller/memberController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../config/Multer.js';

const router = express.Router();

router.post('/create', verifyToken,upload.single('aadharImage'), createMember);


export default router;