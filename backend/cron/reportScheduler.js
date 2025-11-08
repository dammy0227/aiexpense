// cron/reportScheduler.js
import cron from "node-cron";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Insight from "../models/Insight.js";
import { generateInsights } from "../services/aiService.js";
import { sendEmail } from "../services/emailService.js";
import { logInfo, logError } from "../utils/logger.js";

/**
 * Schedule weekly reports on Sunday at 8 PM
 */
export const scheduleWeeklyReports = () => {
  cron.schedule("0 20 * * 0", async () => {
    logInfo("Running weekly report scheduler...");

    try {
      const users = await User.find();

      for (const user of users) {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const transactions = await Transaction.find({
          userId: user._id,
          date: { $gte: lastWeek },
        });

        if (transactions.length === 0) continue;

        // Generate AI insights
        const insightsText = await generateInsights(transactions);

        // Save insight to DB
        const insight = new Insight({
          userId: user._id,
          type: "weekly",
          message: insightsText,
        });
        await insight.save();

        // Send email
        await sendEmail(
          user.email,
          "Your Weekly Expense Insights",
          `<p>Hello ${user.name},</p><p>${insightsText}</p>`
        );
      }

      logInfo("Weekly reports completed successfully.");
    } catch (error) {
      logError("Error in weekly report scheduler: " + error.message);
    }
  });
};

/**
 * Schedule monthly reports on 1st day of month at 8 PM
 */
export const scheduleMonthlyReports = () => {
  cron.schedule("0 20 1 * *", async () => {
    logInfo("Running monthly report scheduler...");

    try {
      const users = await User.find();

      for (const user of users) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const transactions = await Transaction.find({
          userId: user._id,
          date: { $gte: startOfMonth },
        });

        if (transactions.length === 0) continue;

        // Generate AI insights
        const insightsText = await generateInsights(transactions);

        // Save insight to DB
        const insight = new Insight({
          userId: user._id,
          type: "monthly",
          message: insightsText,
        });
        await insight.save();

        // Send email
        await sendEmail(
          user.email,
          "Your Monthly Expense Insights",
          `<p>Hello ${user.name},</p><p>${insightsText}</p>`
        );
      }

      logInfo("Monthly reports completed successfully.");
    } catch (error) {
      logError("Error in monthly report scheduler: " + error.message);
    }
  });
};
