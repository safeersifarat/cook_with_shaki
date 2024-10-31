import express from 'express';
import { register, login, getUserProfile, updateUserProfile, upload } from '../controllers/authController.js';
import authenticateJWT from "../middlewares/auth.js"; // Renamed to match middleware export

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Route to get profile
router.get("/profile", authenticateJWT, getUserProfile);

// Route to update profile
router.put("/profile", authenticateJWT, upload.single("profilePic"), updateUserProfile);

export default router;
