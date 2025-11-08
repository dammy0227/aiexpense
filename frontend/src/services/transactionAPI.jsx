import API from "./api";

// Get all transactions
export const getTransactions = () => API.get("/transactions");

// Add a manual transaction
export const addTransaction = (transaction) => API.post("/transactions", transaction);

// Upload a receipt (image/pdf)
export const uploadReceipt = (formData) =>
  API.post("/transactions/receipt", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Update a transaction
export const updateTransactionAPI = (transaction) =>
  API.put(`/transactions/${transaction._id}`, transaction);

// Delete a transaction
export const deleteTransactionAPI = (id) => API.delete(`/transactions/${id}`);
