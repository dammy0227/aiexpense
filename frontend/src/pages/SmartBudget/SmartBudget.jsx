// src/pages/SmartBudget/SmartBudget.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget, saveBudget } from "../../features/budget/budgetThunk";
import { fetchTransactions } from "../../features/transaction/transactionThunk";
import BudgetProgressBar from "../../components/BudgetProgressBar/BudgetProgressBar";
import "./SmartBudget.css";

const SmartBudget = () => {
  const dispatch = useDispatch();
  const { budget, loading, error } = useSelector((state) => state.budget);
  const { transactions } = useSelector((state) => state.transaction);

  const [income, setIncome] = useState("");

  useEffect(() => {
    dispatch(fetchBudget());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleGenerateBudget = () => {
    if (!income || Number(income) <= 0) {
      alert("Please enter a valid income amount.");
      return;
    }
    dispatch(saveBudget({ income: Number(income), transactions: transactions || [] }));
  };

  // Format currency (₦)
  const formatCurrency = (value) =>
    `₦${Number(value || 0).toLocaleString("en-NG")}`;

  // Calculate totals
  const totalPlanned = budget?.categories?.reduce((sum, c) => sum + c.limit, 0) || 0;
  const totalSpent = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

  const currentMonth = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="smart-budget-page">
      <h2>AI-Recommended Budget for {currentMonth}</h2>

      {/* Income input */}
      <div className="income-input">
        <label htmlFor="income">Monthly Income:</label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter your monthly income"
        />
        <button onClick={handleGenerateBudget} disabled={loading}>
          {loading ? "Generating..." : "Generate AI Budget"}
        </button>
      </div>

      {/* Summary section */}
      {budget && (
        <div className="budget-summary">
          <div className="summary-card">
            <h4>Total Income</h4>
            <p>{formatCurrency(budget.totalLimit)}</p>
          </div>
          <div className="summary-card">
            <h4>Total Planned</h4>
            <p>{formatCurrency(totalPlanned)}</p>
          </div>
          <div className="summary-card">
            <h4>Total Spent</h4>
            <p>{formatCurrency(totalSpent)}</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="error-text">{error}</p>}

      {/* No budget yet */}
      {!budget?.categories?.length && !loading && (
        <p>No AI-recommended budget available. Enter your income to generate one.</p>
      )}

      {/* Budget list */}
      <div className="budget-list">
        {budget?.categories?.map((cat) => {
          const spent = transactions
            ?.filter((t) => t.category === cat.name)
            ?.reduce((sum, t) => sum + t.amount, 0) || 0;

          return (
            <BudgetProgressBar
              key={cat.name}
              categoryName={cat.name}
              spent={spent}
              limit={cat.limit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SmartBudget;
