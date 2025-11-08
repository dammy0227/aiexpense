import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

const ExpensePieChart = () => {
  const transactions = useSelector((state) => state.transaction.transactions);

  // Aggregate amounts by category
  const data = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
