// routes/aiRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { categorize, getInsights } from "../controllers/aiController.js";

const router = express.Router();

// POST /api/ai/categorize - categorize a transaction
router.post("/categorize", protect, categorize);

// GET /api/ai/insights - get AI-generated insights
router.get("/insights", protect, getInsights);

export default router;
