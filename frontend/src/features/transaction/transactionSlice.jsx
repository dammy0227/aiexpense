import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  createTransaction,
  uploadReceiptFile,
  updateTransaction,
  deleteTransaction,
} from "./transactionThunk";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --------- FETCH TRANSACTIONS ---------
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch transactions";
      });

    // --------- ADD TRANSACTION ---------
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        // ✅ Daily report already updated inside the thunk
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add transaction";
      });

    // --------- UPLOAD RECEIPT ---------
    builder
      .addCase(uploadReceiptFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadReceiptFile.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        // ✅ Daily report already updated inside the thunk
      })
      .addCase(uploadReceiptFile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to upload receipt";
      });

    // --------- UPDATE TRANSACTION ---------
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.transactions[index] = action.payload;
        // ✅ Daily report already updated inside the thunk
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update transaction";
      });

    // --------- DELETE TRANSACTION ---------
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (t) => t._id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to delete transaction";
      });
  },
});

export const { clearTransactionError } = transactionSlice.actions;
export default transactionSlice.reducer;
