import { createSlice } from "@reduxjs/toolkit";
import { categorizeTransactionThunk, fetchInsights } from "./aiThunk";

const initialState = {
  category: null,   // Last categorized transaction
  insights: [],     // AI insights for dashboard
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearAIState: (state) => {
      state.category = null;
      state.insights = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // --------- CATEGORIZE TRANSACTION ---------
    builder
      .addCase(categorizeTransactionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categorizeTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
      })
      .addCase(categorizeTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to categorize transaction";
      });

    // --------- FETCH AI INSIGHTS ---------
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload.insights;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch insights";
      });
  },
});

export const { clearAIState } = aiSlice.actions;
export default aiSlice.reducer;
