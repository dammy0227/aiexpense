import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authThunk";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="register-container">
      {/* Navbar */}
      <nav className="nav">
        <div className="logo">SmartBudget AI</div>
      </nav>

      {/* Main Section */}
      <div className="register-content">
        <div className="info-section">
          <h1>Take Control of Your Finances with AI</h1>
          <p>
            SmartBudget helps you track expenses effortlessly, analyze your
            spending habits, and create intelligent budgets automatically — so
            you can focus on what really matters.
          </p>
          <p className="highlight">
            Join now and let AI help you make smarter financial decisions.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create an Account</h2>

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="error">{error}</p>}

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
