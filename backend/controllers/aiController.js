// controllers/aiController.js
import { categorizeTransaction, generateInsights } from "../services/aiService.js";
import Transaction from "../models/Transaction.js";

/**
 * Categorize a single transaction using Cohere AI
 */
export const categorize = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Transaction description is required" });
    }

    const category = await categorizeTransaction(description);

    res.json({ category: category?.trim() || "Uncategorized" });
  } catch (error) {
    console.error("❌ Error categorizing transaction:", error);
    res.status(500).json({ message: "Failed to categorize transaction" });
  }
};

/**
 * Get AI-generated insights for logged-in user using Cohere AI
 */
export const getInsights = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 }) || [];

    if (transactions.length === 0) {
      return res.json({
        insights: [{ title: "No Data", message: "No transactions available to analyze." }],
      });
    }

    // 🧠 Generate insights using Cohere AI
    const aiOutput = await generateInsights(transactions);
    let insights = [];

    // If Cohere returns plain text
    if (typeof aiOutput === "string" && aiOutput.trim()) {
      insights.push({ title: "AI Insights", message: aiOutput.trim() });
    } 
    // If Cohere returns JSON array of insights
    else if (Array.isArray(aiOutput)) {
      insights = aiOutput.map(item => ({
        title: item.title || "Tip",
        message: item.message || "No message available",
      }));
    } 
    // Fallback
    else {
      insights.push({ title: "AI Error", message: "Could not generate insights from transactions." });
    }

    res.json({ insights });
  } catch (error) {
    console.error("❌ Error generating insights:", error);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};
