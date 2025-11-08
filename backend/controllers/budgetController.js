// controllers/budgetController.js
import Budget from "../models/Budget.js";
import { generateSmartBudget } from "../services/aiService.js"; // Cohere AI service

/**
 * 📊 Get AI smart budget for the current month
 */
export const getSmartBudget = async (req, res) => {
  try {
    const monthKey = new Date().toISOString().slice(0, 7);

    const budget = await Budget.findOne({
      userId: req.user._id,
      month: monthKey,
    });

    if (!budget) {
      return res.json({
        totalLimit: 0,
        categories: [],
        message: "No budget found for the current month",
      });
    }

    res.json(budget);
  } catch (error) {
    console.error("❌ Error fetching smart budget:", error);
    res.status(500).json({ message: "Failed to fetch smart budget" });
  }
};

/**
 * 💡 Save or generate an AI smart budget using Cohere AI
 */
export const saveBudget = async (req, res) => {
  try {
    const { income, transactions } = req.body;

    if (!income || !transactions) {
      return res.status(400).json({ message: "Income and transactions are required" });
    }

    // 🧠 Generate a smart budget using Cohere AI (from aiService.js)
    const budgetData = await generateSmartBudget(income, transactions);

    // Ensure AI response is valid and formatted properly
    const categoriesArray = Object.entries(budgetData || {}).map(([name, limit]) => ({
      name,
      limit,
    }));

    const monthKey = new Date().toISOString().slice(0, 7);

    // 💾 Save or update the user’s budget for this month
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, month: monthKey },
      { totalLimit: income, categories: categoriesArray },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "✅ Smart budget generated successfully",
      budget,
    });
  } catch (error) {
    console.error("❌ Error generating/saving budget:", error);
    res.status(500).json({ message: "Failed to generate smart budget" });
  }
};
