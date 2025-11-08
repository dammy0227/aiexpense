// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  preferences: {
    aiBudget: {
      type: Boolean,
      default: true, // AI handles smart budgeting
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
