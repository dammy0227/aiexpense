import API from "./api";

// Get AI-generated smart budget
export const getBudget = () => API.get("/budget");

// Save budget
export const saveBudget = (budgetData) => API.post("/budget", budgetData);
