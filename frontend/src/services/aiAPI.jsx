import API from "./api";

// Categorize a transaction description
export const categorizeTransaction = (description) =>
  API.post("/ai/categorize", { description });

// Get AI insights
export const getInsights = () => API.get("/ai/insights");
