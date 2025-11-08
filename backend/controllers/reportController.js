// controllers/reportController.js
import Insight from "../models/Insight.js";

/**
 * Get daily insights
 */
export const getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start of next day

    const insights = await Insight.find({
      userId: req.user._id,
      type: "daily",
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ date: -1 });

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get weekly insights
 */
export const getWeeklyReport = async (req, res) => {
  try {
    const insights = await Insight.find({
      userId: req.user._id,
      type: "weekly",
    }).sort({ date: -1 });

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get monthly insights
 */
export const getMonthlyReport = async (req, res) => {
  try {
    const insights = await Insight.find({
      userId: req.user._id,
      type: "monthly",
    }).sort({ date: -1 });

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create or update a daily insight
 * Call this whenever a transaction is added
 */
export const upsertDailyReport = async (userId, message) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Find existing daily insight for today
    let insight = await Insight.findOne({
      userId,
      type: "daily",
      date: { $gte: today, $lt: tomorrow },
    });

    if (!insight) {
      // Create new daily insight
      insight = new Insight({
        userId,
        type: "daily",
        message,
        date: new Date(),
      });
    } else {
      // Update existing insight (append or replace message)
      insight.message = message;
    }

    await insight.save();
    return insight;
  } catch (error) {
    console.error("Error upserting daily report:", error);
  }
};
