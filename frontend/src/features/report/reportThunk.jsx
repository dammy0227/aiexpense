import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyReports, getWeeklyReports, getMonthlyReports } from "../../services/reportAPI";

// ----------------- FETCH DAILY REPORT -----------------
export const fetchDailyReport = createAsyncThunk(
  "report/fetchDailyReport",
  async (_, thunkAPI) => {
    try {
      const response = await getDailyReports();
      return response.data; // Array of daily insights
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- FETCH WEEKLY REPORT -----------------
export const fetchWeeklyReport = createAsyncThunk(
  "report/fetchWeeklyReport",
  async (_, thunkAPI) => {
    try {
      const response = await getWeeklyReports();
      return response.data; // Array of weekly insights
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- FETCH MONTHLY REPORT -----------------
export const fetchMonthlyReport = createAsyncThunk(
  "report/fetchMonthlyReport",
  async (_, thunkAPI) => {
    try {
      const response = await getMonthlyReports();
      return response.data; // Array of monthly insights
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
