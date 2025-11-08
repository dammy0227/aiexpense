import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetProgressBar from "../../components/BudgetProgressBar/BudgetProgressBar";
import InsightsCard from "../../components/InsightsCard/InsightsCard";
import ExpensePieChart from "../../components/Charts/ExpensePieChart";
import SpendingTrendChart from "../../components/Charts/SpendingTrendChart";

import { fetchTransactions } from "../../features/transaction/transactionThunk";
import { fetchBudget } from "../../features/budget/budgetThunk";
import { fetchInsights } from "../../features/ai/aiThunk";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const { budget } = useSelector((state) => state.budget);
  const { insights } = useSelector((state) => state.ai);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchBudget());
    dispatch(fetchInsights());
  }, [dispatch]);

  return (
    <div className="dashboard-page">
      {/* Charts Section at Top */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Expense Overview</h3>
          <ExpensePieChart />
        </div>
        <div className="chart-card">
          <h3>Spending Trends</h3>
          <SpendingTrendChart />
        </div>
      </div>

      {/* AI Smart Budget Section */}
      <div className="section">
        <h3>AI Smart Budget</h3>
        {budget?.categories?.map((cat) => (
          <BudgetProgressBar
            key={cat.name}
            categoryName={cat.name}
            spent={transactions
              .filter((t) => t.category === cat.name)
              .reduce((sum, t) => sum + t.amount, 0)}
            limit={cat.limit}
          />
        ))}
      </div>

      {/* AI Insights Section */}
      <div className="section">
        <h3>AI Insights</h3>
        <div className="insights-container">
          {insights?.map((insight, idx) => (
            <InsightsCard
              key={idx}
              title={insight.title}
              message={insight.message}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
