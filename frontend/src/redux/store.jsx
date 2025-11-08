import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import authReducer from "../features/auth/authSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import aiReducer from "../features/ai/aiSlice";
import budgetReducer from "../features/budget/budgetSlice";
import reportReducer from "../features/report/reportSlice";

// --------------- PERSIST CONFIG -----------------
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth slice (you can add others if needed)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  ai: aiReducer,
  budget: budgetReducer,
  report: reportReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ignore redux-persist warnings
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
