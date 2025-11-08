import React from "react";
import "./BudgetProgressBar.css";
import { formatCurrency } from "../../utils/formatCurrency";

const BudgetProgressBar = ({ categoryName, spent, limit }) => {
  // Calculate percentage spent
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

  // Change color if overspent
  const barColor = spent > limit ? "#e74c3c" : "#4caf50";

  return (
    <div className="budget-bar-container">
      <div className="budget-label">
        <span>{categoryName}</span>
        <span>
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </span>
      </div>

      <div className="budget-bar">
        <div
          className="budget-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        >
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
