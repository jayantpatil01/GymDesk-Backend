import express from 'express';
import {createMember , getMembers , getMemberById , deleteMember} from '../controller/memberController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../config/Multer.js';

const router = express.Router();

router.post('/create', verifyToken,upload.single('aadharImage'), createMember);
router.get('/get-members', verifyToken, getMembers);    
router.get('/get-member/:id', verifyToken, getMemberById); 
router.delete('/delete-member/:id', verifyToken, deleteMember);


export default router;