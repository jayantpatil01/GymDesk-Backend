import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/aadhar/'); // Ensure this folder exists!
    },
    filename: (req, file, cb) => {
        // Create unique name: aadhar-timestamp.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter (Only allow images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (JPG, PNG, WebP) are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
    fileFilter: fileFilter
});

export default upload;