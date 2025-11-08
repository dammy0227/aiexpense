import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionThunk";
import "./Reports.css";

const Reports = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Filter transactions by period
const filterTransactions = (period) => {
  const now = new Date();
  return transactions.filter((t) => {
    const date = new Date(t.date);
    if (period === "daily") {
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }
    if (period === "weekly") {
      const firstDay = new Date(now);
      firstDay.setDate(now.getDate() - now.getDay());
      firstDay.setHours(0, 0, 0, 0);
      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);
      lastDay.setHours(23, 59, 59, 999);
      return date >= firstDay && date <= lastDay;
    }
    if (period === "monthly") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }
    return false;
  });
};


  // Get summary totals per category
  const getSummary = (txns) => {
    const categoryMap = {};
    let total = 0;
    txns.forEach((t) => {
      const cat = t.category || "Miscellaneous";
      categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
      total += t.amount;
    });
    return { categoryMap, total };
  };

  const dailySummary = getSummary(filterTransactions("daily"));
  const weeklySummary = getSummary(filterTransactions("weekly"));
  const monthlySummary = getSummary(filterTransactions("monthly"));

  return (
    <div className="reports-page">

      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading transactions...</p>}

      {/* Daily Summary */}
      <div className="summary-section">
        <h3>Daily Summary</h3>
        <p>Total Spending: ${dailySummary.total.toFixed(2)}</p>
        <ul>
          {Object.entries(dailySummary.categoryMap).map(([cat, amt]) => (
            <li key={cat}>
              <span>{cat}</span>
              <span>${amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Summary */}
      <div className="summary-section">
        <h3>Weekly Summary</h3>
        <p>Total Spending: ${weeklySummary.total.toFixed(2)}</p>
        <ul>
          {Object.entries(weeklySummary.categoryMap).map(([cat, amt]) => (
            <li key={cat}>
              <span>{cat}</span>
              <span>${amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Summary */}
      <div className="summary-section">
        <h3>Monthly Summary</h3>
        <p>Total Spending: ${monthlySummary.total.toFixed(2)}</p>
        <ul>
          {Object.entries(monthlySummary.categoryMap).map(([cat, amt]) => (
            <li key={cat}>
              <span>{cat}</span>
              <span>${amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
