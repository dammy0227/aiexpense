// routes/budgetRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getSmartBudget, saveBudget } from "../controllers/budgetController.js";

const router = express.Router();

// GET /api/budget/ - get AI smart budget
router.get("/", protect, getSmartBudget);

// POST /api/budget/ - save AI-generated budget
router.post("/", protect, saveBudget);

export default router;
