import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadReceiptFile } from "../../features/transaction/transactionThunk";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSubmit, editingTransaction }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transaction);

  const [description, setDescription] = useState(
    editingTransaction ? editingTransaction.description : ""
  );
  const [amount, setAmount] = useState(
    editingTransaction ? editingTransaction.amount : ""
  );
  const [category, setCategory] = useState(
    editingTransaction ? editingTransaction.category : ""
  );
  const [receiptFile, setReceiptFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [expanded, setExpanded] = useState(false); // toggle form

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
    setSuccessMsg("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      alert("Please fill in all fields");
      return;
    }

    let receiptUrl = null;

    if (receiptFile) {
      const formData = new FormData();
      formData.append("file", receiptFile);

      try {
        const result = await dispatch(uploadReceiptFile(formData)).unwrap();
        receiptUrl = result.url; // assuming backend returns uploaded file URL
        setSuccessMsg("Receipt uploaded successfully!");
      } catch (err) {
        setSuccessMsg("");
        alert("Failed to upload receipt", err);
        return;
      }
    }

    // Call parent onSubmit to handle add/update
    onSubmit({
      description,
      amount: parseFloat(amount),
      category,
      receipt: receiptUrl,
    });

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
    setReceiptFile(null);
    setExpanded(false);
  };

  return (
    <div className={`expense-form-container ${expanded ? "expanded" : ""}`}>
      {!expanded && (
        <button
          className="expense-form-toggle"
          onClick={() => setExpanded(true)}
        >
          ➕
        </button>
      )}

      {expanded && (
        <form onSubmit={handleFormSubmit} className="expense-form">
          <button
            type="button"
            className="close-btn"
            onClick={() => setExpanded(false)}
          >
            ✖
          </button>

          <h3>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h3>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Starbucks Coffee"
          />

          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
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

          <label>Upload Receipt</label>
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
          {receiptFile && <p>Selected file: {receiptFile.name}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (editingTransaction ? "Updating..." : "Adding...") : editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>

          {successMsg && <p className="success">{successMsg}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
