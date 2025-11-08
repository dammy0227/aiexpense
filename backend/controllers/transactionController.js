import Transaction from "../models/Transaction.js";
import { extractTextFromReceipt } from "../services/ocrService.js";
import { categorizeTransaction } from "../services/aiService.js";
import { upsertDailyReport } from "./reportController.js"; // ✅ import daily report helper

/**
 * Get all transactions for the logged-in user
 */
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

/**
 * Add a transaction manually (auto-categorized by Cohere AI if category not provided)
 */
export const addTransaction = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    let finalCategory = category;
    if (!finalCategory && description) {
      finalCategory = await categorizeTransaction(description);
    }

    const transaction = await Transaction.create({
      userId: req.user._id,
      amount,
      description,
      category: finalCategory?.trim() || "Miscellaneous",
      date: date || new Date(),
      source: "manual",
    });

    // ✅ Update daily report
    const message = `Added transaction: ${description} - $${amount}`;
    await upsertDailyReport(req.user._id, message);

    res.status(201).json(transaction);
  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    res.status(500).json({ message: "Failed to add transaction" });
  }
};

/**
 * Process uploaded receipt (OCR + Cohere AI categorization)
 */
export const processReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const text = await extractTextFromReceipt(req.file.path);
    const category = await categorizeTransaction(text);

    const transaction = await Transaction.create({
      userId: req.user._id,
      description: text,
      category: category?.trim() || "Miscellaneous",
      amount: 0,
      source: "receipt",
    });

    // ✅ Update daily report
    const message = `Processed receipt: ${text}`;
    await upsertDailyReport(req.user._id, message);

    res.status(201).json(transaction);
  } catch (error) {
    console.error("❌ Error processing receipt:", error);
    res.status(500).json({ message: "Failed to process receipt" });
  }
};

/**
 * DELETE /api/transactions/:id — Delete a transaction
 */
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted", id: transaction._id });
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

/**
 * PUT /api/transactions/:id — Update a transaction
 */
export const updateTransaction = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    let finalCategory = category;
    if (!finalCategory && description) {
      finalCategory = await categorizeTransaction(description);
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { amount, description, category: finalCategory?.trim() || "Miscellaneous", date },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // ✅ Update daily report
    const message = `Updated transaction: ${description} - $${amount}`;
    await upsertDailyReport(req.user._id, message);

    res.json(transaction);
  } catch (error) {
    console.error("❌ Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};
