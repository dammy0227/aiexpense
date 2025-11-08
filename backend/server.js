// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// Import cron jobs
import { scheduleWeeklyReports, scheduleMonthlyReports } from "./cron/reportScheduler.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reports", reportRoutes);

// Error handler (after all routes)
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Start cron jobs
  scheduleWeeklyReports();
  scheduleMonthlyReports();
});
