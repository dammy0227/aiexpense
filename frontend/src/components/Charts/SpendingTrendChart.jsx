import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const SpendingTrendChart = () => {
  const transactions = useSelector((state) => state.transaction.transactions);

  // Aggregate spending by date
  const data = Object.values(
    transactions.reduce((acc, t) => {
      const date = new Date(t.date).toLocaleDateString();
      acc[date] = acc[date] || { date, amount: 0 };
      acc[date].amount += t.amount;
      return acc;
    }, {})
  );

  // Sort by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Line type="monotone" dataKey="amount" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendingTrendChart;
