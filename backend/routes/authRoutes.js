// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

router.put("/profile", protect, updateProfile);
export default router;
