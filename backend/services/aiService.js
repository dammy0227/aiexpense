// backend/services/aiService.js
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

console.log("🤖 Cohere AI Chat client initialized");

/**
 * Generate text using Cohere Chat API
 */
async function generateText(prompt) {
  try {
    const response = await cohere.chat({
      model: "command-r-plus-08-2024", // ✅ correct model
      message: prompt,
    });

    return response.text?.trim() || "No response generated.";
  } catch (error) {
    console.error("❌ Cohere Chat error:", error);
    return "AI generation failed.";
  }
}

/**
 * Categorize a transaction
 */
export async function categorizeTransaction(description) {
  const prompt = `Categorize this transaction into one of: 'Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment', or 'Other'.
Transaction: "${description}"`;
  return await generateText(prompt);
}

/**
 * Generate insights based on transactions
 */
export async function generateInsights(transactions) {
  const prompt = `
  Based on these transactions:
  ${JSON.stringify(transactions, null, 2)}
  Provide 3 financial insights in JSON format like:
  [{"title": "Insight 1", "message": "..."}, {"title": "Insight 2", "message": "..."}]
  `;

  const response = await generateText(prompt);

  try {
    return JSON.parse(response);
  } catch {
    return [{ title: "AI Insight", message: response }];
  }
}

/**
 * Generate a smart budget
 */
export async function generateSmartBudget(income, transactions) {
  const prompt = `
  Analyze these transactions: ${JSON.stringify(transactions)}.
  Monthly income: ${income}.
  Suggest a JSON budget: {"Food": 200, "Transport": 150, "Savings": 300, ...}
  `;

  const response = await generateText(prompt);

  try {
    return JSON.parse(response);
  } catch {
    return {
      Food: income * 0.3,
      Transport: income * 0.2,
      Savings: income * 0.2,
      Miscellaneous: income * 0.3,
    };
  }
}
