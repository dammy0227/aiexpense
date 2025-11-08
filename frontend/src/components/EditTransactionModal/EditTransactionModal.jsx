// src/components/EditTransactionModal/EditTransactionModal.jsx
import React, { useState, useEffect } from "react";
import "./EditTransactionModal.css";

const EditTransactionModal = ({ transaction, onClose, onSubmit, loading }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setSource(transaction.source);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...transaction,
      description,
      amount: parseFloat(amount),
      category,
      source,
    });
  };

  if (!transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Transaction</h3>

        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          <label>Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
