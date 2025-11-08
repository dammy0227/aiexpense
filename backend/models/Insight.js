import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["daily", "weekly", "monthly"], // ✅ added daily
    required: true,
  },
  message: {
    type: String,
    required: true, // AI-generated advice/tips
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Insight", insightSchema);
