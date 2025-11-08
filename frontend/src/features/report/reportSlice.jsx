import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyReport, fetchWeeklyReport, fetchMonthlyReport } from "./reportThunk";

const initialState = {
  daily: [],
  weekly: [],
  monthly: [],
  loading: {
    daily: false,
    weekly: false,
    monthly: false,
  },
  error: {
    daily: null,
    weekly: null,
    monthly: null,
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReportError: (state, action) => {
      // Clear error for specific report type or all
      if (action.payload && ["daily", "weekly", "monthly"].includes(action.payload)) {
        state.error[action.payload] = null;
      } else {
        state.error = { daily: null, weekly: null, monthly: null };
      }
    },
  },
  extraReducers: (builder) => {
    // --------- DAILY REPORT ---------
    builder
      .addCase(fetchDailyReport.pending, (state) => {
        state.loading.daily = true;
        state.error.daily = null;
      })
      .addCase(fetchDailyReport.fulfilled, (state, action) => {
        state.loading.daily = false;
        state.daily = action.payload;
      })
      .addCase(fetchDailyReport.rejected, (state, action) => {
        state.loading.daily = false;
        state.error.daily = action.payload?.message || "Failed to fetch daily report";
      });

    // --------- WEEKLY REPORT ---------
    builder
      .addCase(fetchWeeklyReport.pending, (state) => {
        state.loading.weekly = true;
        state.error.weekly = null;
      })
      .addCase(fetchWeeklyReport.fulfilled, (state, action) => {
        state.loading.weekly = false;
        state.weekly = action.payload;
      })
      .addCase(fetchWeeklyReport.rejected, (state, action) => {
        state.loading.weekly = false;
        state.error.weekly = action.payload?.message || "Failed to fetch weekly report";
      });

    // --------- MONTHLY REPORT ---------
    builder
      .addCase(fetchMonthlyReport.pending, (state) => {
        state.loading.monthly = true;
        state.error.monthly = null;
      })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.loading.monthly = false;
        state.monthly = action.payload;
      })
      .addCase(fetchMonthlyReport.rejected, (state, action) => {
        state.loading.monthly = false;
        state.error.monthly = action.payload?.message || "Failed to fetch monthly report";
      });
  },
});

export const { clearReportError } = reportSlice.actions;
export default reportSlice.reducer;
