import { createAsyncThunk } from "@reduxjs/toolkit";
import { categorizeTransaction, getInsights } from "../../services/aiAPI";

// ----------------- CATEGORIZE TRANSACTION -----------------
export const categorizeTransactionThunk = createAsyncThunk(
  "ai/categorizeTransaction",
  async (description, thunkAPI) => {
    try {
      const response = await categorizeTransaction(description);
      return response.data; // { category: "Food" }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- GET AI INSIGHTS -----------------
export const fetchInsights = createAsyncThunk(
  "ai/fetchInsights",
  async (_, thunkAPI) => {
    try {
      const response = await getInsights();
      return response.data; // { insights: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
