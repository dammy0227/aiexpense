import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, updateUserProfile } from "../../services/authAPI";

// ----------------- REGISTER -----------------
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData);
      return response.data || response; // Axios response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- LOGIN -----------------
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------- UPDATE PROFILE -----------------
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUserProfile(userData);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
