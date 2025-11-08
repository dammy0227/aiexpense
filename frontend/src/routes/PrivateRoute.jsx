import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute component
 * Wraps around routes/components that require authentication
 */
const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child component
  return children;
};

export default PrivateRoute;
