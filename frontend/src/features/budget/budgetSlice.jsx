import { createSlice } from "@reduxjs/toolkit";
import { fetchBudget, saveBudget } from "./budgetThunk";

const initialState = {
  budget: null,      // Current month budget
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearBudgetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --------- FETCH BUDGET ---------
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch budget";
      });

    // --------- SAVE BUDGET ---------
    builder
      .addCase(saveBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(saveBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to save budget";
      });
  },
});

export const { clearBudgetError } = budgetSlice.actions;
export default budgetSlice.reducer;
