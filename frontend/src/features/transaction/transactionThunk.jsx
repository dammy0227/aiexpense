import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  uploadReceipt,
  updateTransactionAPI,
  deleteTransactionAPI,
} from "../../services/transactionAPI";

// ----------------- FETCH ALL TRANSACTIONS -----------------
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await getTransactions();
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- ADD MANUAL TRANSACTION -----------------
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const response = await addTransaction(transactionData);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- UPLOAD RECEIPT -----------------
export const uploadReceiptFile = createAsyncThunk(
  "transaction/uploadReceipt",
  async (formData, thunkAPI) => {
    try {
      const response = await uploadReceipt(formData);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- UPDATE TRANSACTION -----------------
export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const response = await updateTransactionAPI(transactionData);
      return response.data || transactionData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- DELETE TRANSACTION -----------------
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      await deleteTransactionAPI(id);
      return id; // return deleted ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
