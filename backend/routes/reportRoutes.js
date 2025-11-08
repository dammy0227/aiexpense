// routes/reportRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDailyReport, getWeeklyReport, getMonthlyReport } from "../controllers/reportController.js";

const router = express.Router();

// GET /api/reports/daily - fetch daily insights
router.get("/daily", protect, getDailyReport);

// GET /api/reports/weekly - fetch weekly insights
router.get("/weekly", protect, getWeeklyReport);

// GET /api/reports/monthly - fetch monthly insights
router.get("/monthly", protect, getMonthlyReport);

export default router;
