// models/Budget.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String, // Format: "YYYY-MM"
    required: true,
  },
  totalLimit: {
    type: Number,
    required: true, 
  },
  categories: [categorySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Budget", budgetSchema);
