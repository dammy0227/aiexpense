import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
  createTransaction,
} from "../../features/transaction/transactionThunk";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import EditTransactionModal from "../../components/EditTransactionModal/EditTransactionModal";
import "./Transactions.css";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state) => state.transaction
  );

  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleCreate = (data) => {
    dispatch(createTransaction(data));
  };

  const handleUpdate = (data) => {
    dispatch(updateTransaction(data));
    setEditingTransaction(null);
  };

  return (
    <div className="transactions-page">
      {/* Create Transaction Form */}
      <ExpenseForm onSubmit={handleCreate} />

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t._id}>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>${Number(t.amount).toFixed(2)}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.source}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(t)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Transactions;
