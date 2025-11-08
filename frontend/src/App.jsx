import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import SmartBudget from "./pages/SmartBudget/SmartBudget";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Dashboard Layout */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/smart-budget" element={<SmartBudget />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
