import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBudget, saveBudget as saveBudgetAPI } from "../../services/budgetAPI";

// ----------------- FETCH SMART BUDGET -----------------
export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (_, thunkAPI) => {
    try {
      const response = await getBudget();
      return response.data; // Budget object from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- SAVE SMART BUDGET -----------------
export const saveBudget = createAsyncThunk(
  "budget/saveBudget",
  async (budgetData, thunkAPI) => {
    try {
      const response = await saveBudgetAPI(budgetData);
      return response.data; // Updated budget object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
